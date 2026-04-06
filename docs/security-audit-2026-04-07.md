# KaderOS Web App -- Security Audit Report

**Datum:** 2026-04-07  
**Scope:** `/apps/web/` -- 41 API Routes, Middleware, Auth, Crypto, Secrets, Frontend  
**Auditor:** Automated Security Review (Claude)  
**Status:** Abgeschlossen

---

## Executive Summary

Die KaderOS Web App zeigt ein solides Security-Fundament: konsistente Auth-Checks, Ownership-Verification, AES-256-GCM Encryption und saubere Supabase-Integration. Es gibt jedoch **2 Critical**, **3 High**, **5 Medium** und **3 Low** Findings, die zeitnah behoben werden sollten.

---

## Findings

### CRITICAL

#### C-1: Secrets im Klartext in `.env.local` im Git-Repository

**Betroffene Dateien:**
- `/apps/web/.env.local`
- `/.env.local`

**Problem:** Beide `.env.local` Dateien enthalten hochsensible Secrets im Klartext:
- `SUPABASE_SERVICE_ROLE_KEY` (vollstaendiger JWT mit Service Role Zugriff -- bypassed RLS!)
- `DATABASE_URL` mit Klartext-Passwort (`h5zIfnknPlnTK50R`)
- `KADEROS_MASTER_KEY` (AES-256 Encryption Key fuer alle Connector Credentials)
- `BRAIN_API_KEY`
- `APIFY_API_TOKEN`

Falls diese Dateien jemals committet wurden oder das Repository geteilt wird, sind **alle gespeicherten API-Keys aller Kunden kompromittierbar** (KADEROS_MASTER_KEY entschluesselt alle Connector Credentials).

**Fix:**
1. Sofort pruefen: `git log --all --full-history -- '*/.env*'` -- falls jemals committet, ALLE Secrets rotieren
2. `.env.local` in `.gitignore` sicherstellen (auf Root- UND App-Level)
3. Secrets ausschliesslich ueber Vercel Environment Variables oder einen Secret Manager verwalten
4. KADEROS_MASTER_KEY rotieren erfordert Re-Encryption aller gespeicherten Credentials

---

#### C-2: Fehlender Ownership-Check auf 2 API Routes -- IDOR Vulnerability

**Betroffene Dateien:**
- `/apps/web/app/api/heartbeats/route.ts` (GET) -- Zeile 24
- `/apps/web/app/api/heartbeats/[id]/route.ts` (PUT)

**Problem:**

**heartbeats/route.ts GET:** Auth-Check vorhanden, aber **kein `verifyCompanyOwnership()`**. Jeder authentifizierte User kann Heartbeats jeder Company abfragen, indem er eine beliebige `companyId` uebergibt:
```
GET /api/heartbeats?companyId=<fremde-company-id>
```

**heartbeats/[id]/route.ts PUT:** Auth-Check vorhanden, aber **kein Ownership-Check**. Jeder authentifizierte User kann Heartbeats beliebiger Agents aendern (is_enabled, cron_expression):
```
PUT /api/heartbeats/<fremde-heartbeat-id>
Body: { "isEnabled": false }
```
Ein Angreifer koennte damit alle Heartbeats anderer Companies deaktivieren oder manipulieren.

**Fix:**
1. `heartbeats/route.ts`: `verifyCompanyOwnership()` hinzufuegen vor dem DB-Query
2. `heartbeats/[id]/route.ts`: Heartbeat laden, `company_id` extrahieren, `verifyCompanyOwnership()` pruefen

---

### HIGH

#### H-1: Kein Rate Limiting auf KEINER API Route

**Betroffene Dateien:** Alle 41 API Routes

**Problem:** Keine einzige Route implementiert Rate Limiting. Kritische Angriffsvektoren:
- **Brute Force auf Auth:** Unbegrenzte Login-Versuche (Supabase hat eigenes Limit, aber fuer API Routes gibt es keins)
- **API Key Testing:** `/api/connectors/[id]/test` sendet Requests an Anthropic/OpenAI/DeepL -- kann als Proxy missbraucht werden
- **Cost Explosion:** `/api/agents/[id]/run` und `/api/chat` loesen LLM-Calls aus. Ein Angreifer mit validem Account koennte tausende Calls ausloesen und massive API-Kosten verursachen (trotz Budget-Check -- der Budget-Check limitiert nur pro Agent, nicht pro User/Zeiteinheit)
- **Waitlist Spam:** `/api/waitlist` POST hat kein Rate Limit

**Fix:**
1. Vercel Rate Limiting Middleware einsetzen oder `@upstash/ratelimit` mit Redis
2. Prioritaet: `/api/chat`, `/api/agents/[id]/run`, `/api/connectors/[id]/test`, `/api/waitlist`
3. Empfehlung: 10 req/min fuer LLM-Calls, 60 req/min fuer reads, 5 req/min fuer waitlist

---

#### H-2: STRIPE_WEBHOOK_SECRET fehlt in .env.local

**Betroffene Dateien:**
- `/apps/web/app/api/billing/webhook/route.ts` -- Zeile 68
- `/apps/web/.env.local`

**Problem:** Die Webhook-Route verwendet `process.env.STRIPE_WEBHOOK_SECRET!`, aber dieses Secret ist in der `.env.local` **nicht vorhanden**. Das bedeutet:
- Lokal wuerde die Webhook-Verifizierung mit `undefined` fehlschlagen
- Falls in Produktion ebenfalls fehlend: Stripe-Webhooks werden abgelehnt ODER (schlimmer) wenn Stripe SDK `undefined` akzeptiert, koennte jeder gefaelschte Webhooks senden und Plans manipulieren

**Fix:**
1. `STRIPE_WEBHOOK_SECRET` in Vercel Environment Variables pruefen
2. Falls nicht gesetzt: sofort aus Stripe Dashboard holen und setzen
3. In `.env.local` fuer lokale Entwicklung ebenfalls setzen

---

#### H-3: CRON_SECRET fehlt in .env.local -- Heartbeat Tick Endpoint

**Betroffene Dateien:**
- `/apps/web/app/api/heartbeat/tick/route.ts` -- Zeile 87
- `/apps/web/.env.local`

**Problem:** Der Heartbeat Tick Endpoint (GET) authentifiziert via `Bearer ${process.env.CRON_SECRET}`. Dieses Secret ist in `.env.local` nicht vorhanden. Vercel setzt es automatisch fuer Cron Jobs, aber:
- Falls jemand den Endpoint manuell aufruft und CRON_SECRET in Produktion `undefined` ist, koennte `Bearer undefined` als Vergleich dienen
- Der Endpoint verwendet `service_role_key` und operiert ueber RLS hinweg -- er kann **alle Companies** Daten lesen und Agenten ausfuehren

**Fix:**
1. Sicherstellen, dass `CRON_SECRET` in Vercel Environment Variables existiert
2. Zusaetzlich: Reject wenn `CRON_SECRET` undefined ist: `if (!process.env.CRON_SECRET) return 500`
3. Erwaegenswert: IP-Restriction auf Vercel Cron IPs

---

### MEDIUM

#### M-1: Waitlist Route verwendet Anon-Client statt Server-Client

**Betroffene Datei:** `/apps/web/app/api/waitlist/route.ts`

**Problem:** Die Route erstellt einen Supabase-Client mit dem publishable key direkt (Zeile 4-7), statt den Server-Client mit Cookie-Auth zu nutzen. Das ist fuer eine Public Route akzeptabel, ABER:
- Der Client wird auf Modul-Level erstellt (Singleton) -- in Serverless Functions kann das zu Stale-Connection-Issues fuehren
- GET Endpoint gibt die Waitlist-Count zurueck -- kein Issue, aber kein Auth erforderlich

**Fix:**
1. Client in der Request-Handler-Funktion erstellen (nicht auf Modul-Level)
2. Oder: Separate Supabase-Connection fuer Public Routes

---

#### M-2: Keine Content Security Policy (CSP) Headers

**Betroffene Datei:** `/apps/web/next.config.ts`, `/apps/web/middleware.ts`

**Problem:** Es gibt keine Content Security Policy Headers konfiguriert. Weder in `next.config.ts` (headers), noch in der Middleware, noch via `<meta>` Tag. Das erhoht das XSS-Risiko.

**Fix:**
1. In `next.config.ts` Security Headers hinzufuegen:
```ts
headers: async () => [{
  source: '/(.*)',
  headers: [
    { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://api.anthropic.com;" },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ],
}]
```

---

#### M-3: Input Validation ist minimal -- keine Schema Validation

**Betroffene Dateien:** Alle POST/PUT Routes

**Problem:** Input Validation beschraenkt sich auf "ist das Feld vorhanden?" Checks. Es gibt keine Schema Validation (z.B. Zod). Beispiele:
- `priority` in Tasks: akzeptiert jeden String, nicht nur "low"/"medium"/"high"
- `confidence` in Decisions: akzeptiert jede Zahl, auch negative oder > 100
- `cronExpression` in Heartbeats: keine Validierung der Cron-Syntax
- `type` in Agents: akzeptiert jeden String
- `monthlyLimitChf` in Budgets: keine Pruefung auf positive Zahl

**Fix:**
1. Zod oder Valibot fuer Request Body Validation einsetzen
2. Shared Schema-Definitionen erstellen (z.B. in `@kaderos/db` oder `lib/schemas.ts`)
3. Mindestens die kritischen Felder validieren: confidence (0-100), priority (enum), cron (regex)

---

#### M-4: Error Messages leaken interne Supabase-Details

**Betroffene Dateien:** Alle Routes mit `error.message` Response

**Problem:** Bei DB-Fehlern wird `error.message` direkt an den Client zurueckgegeben:
```ts
return NextResponse.json({ error: error.message }, { status: 500 });
```
Dies kann interne Tabellen- und Spaltennamen, Constraint-Details oder PostgreSQL-Fehlermeldungen exponieren.

**Fix:**
1. Generische Fehlermeldung an Client: `{ error: "Internal server error" }`
2. Detaillierten Fehler nur serverseitig loggen: `console.error(error)`
3. Nur bei bekannten Fehlern (z.B. 23505 Unique Violation) spezifische Meldungen

---

#### M-5: Heartbeat Tick Route -- Credential Lookup ohne User-Scope

**Betroffene Datei:** `/apps/web/app/api/heartbeat/tick/route.ts` -- Zeile 175-179

**Problem:** Der Heartbeat Tick verwendet den Service Role Key und sucht Credentials mit:
```ts
.eq("company_id", agent.company_id)
.eq("provider", providerKey)
.limit(1)
.single();
```
Es fehlt `.eq("user_id", ...)`. Das bedeutet: der Tick nimmt den **ersten Credential** jedes Providers fuer die Company, egal welchem User er gehoert. Bei Multi-User Companies koennte ein Agent den API-Key eines anderen Users verwenden.

**Fix:**
1. Entweder: Company-Level Credentials einfuehren (statt User-Level)
2. Oder: Agent Config um `credential_owner_id` erweitern
3. Mindestens: Dokumentieren, dass aktuell nur Single-Owner-Companies unterstuetzt sind

---

### LOW

#### L-1: dangerouslySetInnerHTML Verwendung -- sicher

**Betroffene Datei:** `/apps/web/app/layout.tsx` -- Zeile 63

**Problem:** `dangerouslySetInnerHTML` wird fuer structured data (JSON-LD) verwendet. Der Inhalt ist **statisch hartcodiert** (kein User-Input). Das ist sicher, aber sollte dokumentiert werden.

**Status:** Kein Action Item erforderlich. Nur Awareness.

---

#### L-2: Supabase Publishable Key heisst nicht "anon key"

**Betroffene Dateien:** `.env.local`

**Problem:** Der Key heisst `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` und beginnt mit `sb_publishable_`. Das ist der neue Supabase Key Format. Der Key ist public-safe (designed to be exposed), allerdings:
- RLS muss korrekt konfiguriert sein (49 Policies existieren laut Aufgabenstellung)
- Der publishable key alleine erlaubt keinen Datenzugriff ohne Auth-Token

**Status:** OK, aber RLS Policies sollten regelmaessig reviewed werden.

---

#### L-3: Kein Audit Trail fuer fehlgeschlagene Auth-Versuche

**Problem:** Fehlgeschlagene Auth-Versuche (401/403) werden nicht geloggt. Es gibt `logActivity()` fuer erfolgreiche Aktionen, aber kein Logging fuer:
- Ungueltige Tokens
- Ownership-Verletzungen (403)
- Fehlgeschlagene Webhook-Verifizierungen

**Fix:**
1. Optional: Auth-Failures in ein separates Security-Log schreiben
2. Mindestens: 403 Responses mit User-ID loggen

---

## Positiv-Befunde -- Was bereits gut ist

### Auth
- **Konsistenter Auth-Check:** 39 von 41 Routes pruefen `supabase.auth.getUser()` (Ausnahmen: `/api/waitlist` (public) und `/api/templates` (public) -- beides korrekt)
- **Ownership Verification:** `verifyCompanyOwnership()` ist zentral implementiert und wird in 35+ Routes verwendet
- **Server-Side Auth:** Supabase SSR Client mit Cookie-basiertem Session Handling -- korrekt implementiert
- **Middleware schuetzt Frontend:** `/dashboard` und `/onboarding` werden per Middleware geschuetzt

### Encryption
- **AES-256-GCM korrekt implementiert:** Random IV (12 Bytes), Auth Tag, versioned scheme (`aes256gcm_v1`)
- **SHA-256 Hash fuer Deduplication:** Credential-Werte werden gehasht fuer Upsert-Logik
- **Master Key wird nie exponiert:** Nur Server-seitig, nicht in NEXT_PUBLIC_ Variablen

### SQL Injection
- **Kein Risiko:** Alle DB-Queries laufen ueber den Supabase Client (PostgREST), der parametrisierte Queries verwendet. Kein raw SQL in der Web App.

### Stripe Billing
- **Webhook Signature Verification:** korrekt implementiert mit `constructEvent()`
- **Checkout mit Metadata:** Company ID und Plan werden sauber durchgereicht
- **Subscription Lifecycle:** Alle Events (create, update, delete, payment_failed) werden behandelt

### CSRF
- **Kein CSRF-Risiko:** Alle mutierenden Endpunkte sind API Routes (JSON-basiert). Browser senden keine JSON POST Requests automatisch (kein Form-Submit). Supabase Auth Token in Cookies mit SameSite Policy schuetzt zusaetzlich.

### Activity Logging
- **Umfassendes Audit Trail:** Nahezu jede Mutation (Create, Update, Delete) wird in `activity_log` geloggt mit Actor, Entity und Details

### Budget System
- **Pre-Execution Budget Check:** Vor jedem Agent Run wird das Budget geprueft
- **Cost Recording:** Token-Kosten werden nach Execution geloggt

---

## OWASP Top 10 Zusammenfassung

| # | Kategorie | Status | Details |
|---|-----------|--------|---------|
| A01 | Broken Access Control | WARNUNG | C-2: 2 Routes ohne Ownership-Check |
| A02 | Cryptographic Failures | OK | AES-256-GCM korrekt. C-1 betrifft Secret Management, nicht Crypto |
| A03 | Injection | OK | Supabase PostgREST = parametrisiert. Kein raw SQL |
| A04 | Insecure Design | OK | Solide Architektur mit Ownership Pattern |
| A05 | Security Misconfiguration | WARNUNG | M-2: Keine CSP Headers. H-2/H-3: Fehlende Secrets |
| A06 | Vulnerable Components | NICHT GEPRUEFT | npm audit nicht ausgefuehrt (out of scope) |
| A07 | Auth Failures | OK | Konsistenter Auth-Check mit Supabase |
| A08 | Software/Data Integrity | OK | Stripe Webhook Signature Verification |
| A09 | Security Logging | TEILWEISE | L-3: Keine Failed-Auth-Logs |
| A10 | SSRF | NIEDRIGES RISIKO | DeepL/Anthropic/OpenAI URLs sind hardcoded. Kein User-kontrollierter URL-Fetch |

---

## Priorisierte Empfehlungen

| Prio | Finding | Aufwand | Impact |
|------|---------|---------|--------|
| 1 | C-1: Secrets pruefen + ggf. rotieren | 2h | Kritisch |
| 2 | C-2: Ownership-Check auf Heartbeat Routes | 30min | Kritisch |
| 3 | H-1: Rate Limiting (mindestens fuer LLM Routes) | 4h | Hoch |
| 4 | H-2/H-3: Fehlende Env Vars pruefen | 30min | Hoch |
| 5 | M-2: Security Headers (CSP, X-Frame-Options) | 1h | Mittel |
| 6 | M-3: Zod Schema Validation | 4h | Mittel |
| 7 | M-4: Error Messages sanitieren | 2h | Mittel |
| 8 | M-5: Credential Lookup im Heartbeat Tick | 1h | Mittel |

---

*Report Ende. Keine Aenderungen am Code vorgenommen.*
