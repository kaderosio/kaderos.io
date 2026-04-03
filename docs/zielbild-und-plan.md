# KaderOS — Zielbild & Plan

> "Andere prompten. Du führst ein Unternehmen."

---

## 1. ZIELBILD

### Was ist KaderOS?

KaderOS ist eine **Cloud-hosted AI Workforce Platform für Swiss KMU**. Kunden loggen sich auf kaderos.io ein, bauen ihr AI-Team zusammen, pluggen ihre eigenen API Keys ein — und haben ein autonomes Team das ihr Business operiert.

### Die Vision in einem Satz

**Das Betriebssystem für AI-geführte Schweizer Unternehmen.**

### Wer sind unsere ersten Kunden?

**Nicht etablierte KMU-Besitzer.** Sondern:
- Junge Founder die gerade durchstarten (20-35)
- Side-Hustler die noch keinen ersten Mitarbeiter haben
- Freelancer die skalieren wollen ohne Team
- Agentur-Gründer die mit 1-2 Leuten 10x Output wollen
- Aspiring Entrepreneurs die gründen wollen aber kein Budget für Team haben

**Sie haben kein Geld für Mitarbeiter — aber CHF 49/Monat für ein AI-Team.**

Das ist auch warum TikTok unser erster Kanal ist, nicht LinkedIn. Unsere Kunden scrollen TikTok, nicht den Handelszeitung-Newsletter.

### Wie es sich anfühlt

Ein 26-jähriger Founder loggt sich morgens auf dem Handy ein. Sein AI-Sales-Agent hat über Nacht 12 Leads qualifiziert, der AI-Content-Agent hat 3 Instagram Posts vorbereitet, und der AI-Buchhalter hat die Rechnungen in Bexio gecheckt. Alles im Dashboard sichtbar. Alles transparent.

Er gibt grünes Licht für die Posts, schickt die Rechnungen raus, und geht zurück an sein Produkt. Sein AI-Team macht den Rest.

**Er ist Founder, CEO, und Board — sein Team besteht aus Agents.**

### Positionierung

| | Paperclip | Crew AI | AutoGen | **KaderOS** |
|--|-----------|---------|---------|-------------|
| Zielmarkt | Global, Devs | Global, Devs | Global, Devs | **Swiss KMU** |
| Sprache | Englisch | Englisch | Englisch | **Deutsch** |
| Setup | Self-hosted CLI | Python Code | Python Code | **Cloud Login** |
| Swiss APIs | Keine | Keine | Keine | **Bexio, Threema, DeepL, QR-bill, Skribble** |
| Compliance | — | — | — | **nDSG, Swiss Datacenter** |
| Templates | Coming soon | Keine | Keine | **Swiss Branchen-Templates** |
| Zielgruppe | Technical Founders | ML Engineers | Researchers | **Junge Founders, Solopreneurs, Agenturen** |

### Kernprinzipien

1. **Cloud-Hosted, BYOK** — Wir hosten die Plattform, Kunde bringt seine API Keys
2. **Swiss-First** — Deutsch, CHF, nDSG, Swiss Integrations
3. **Einfach** — Kein Terminal, kein Code, kein DevOps. Login → Setup → Läuft. Muss sich anfühlen wie eine App, nicht wie Enterprise Software.
4. **Open Core** — Core Engine open source (AGPLv3), Swiss Features + Premium closed
5. **Templates über Code** — Fertige Agent-Teams importieren statt von null bauen

---

## 2. BUSINESS MODEL

### Revenue

| Tier | CHF/Monat | Was enthalten |
|------|-----------|---------------|
| **Community** | 0 | Open Source, self-hosted, 3 Agents, Basis-Connectors |
| **Pro** | 49 | Cloud-hosted, 10 Agents, alle Connectors, 3 Templates |
| **Team** | 149 | 25 Agents, Team-Zugang, Premium Templates, Priority Support |
| **Agency** | 349 | Unlimited Agents, White-Label, Custom Templates, API Access |

Annual: -20% Rabatt

### Kosten pro Kunde (Cloud)

| Posten | Kosten |
|--------|--------|
| Supabase DB | ~CHF 0-2/Monat (Rows) |
| Vercel Compute | ~CHF 1-5/Monat |
| LLM Tokens | CHF 0 (Kundens Key) |
| API Calls | CHF 0 (Kundens Keys) |
| **Total** | **~CHF 2-7/Monat** |

**Marge: 85-95%** auf allen Paid Tiers.

### Moat (Warum wir gewinnen)

1. **Swiss Integrations** — Bexio, Threema, Skribble, DeepL, QR-bill, Zefix. Kein Wettbewerber hat das.
2. **Sprache** — Komplett auf Deutsch. Swiss casual. Kein "AI Orchestration Platform".
3. **Templates** — "Treuhand-Team importieren" → 5 Agents ready in 30 Sekunden.
4. **Compliance** — nDSG-konform, Swiss Datacenter, BYOK.
5. **Community** — Open Source Core auf GitHub für Reichweite und Developer Trust.

---

## 3. PRODUKT-ARCHITEKTUR

### High-Level

```
kaderos.io (Cloud)
├── Marketing Site (Next.js) ← BESTEHT BEREITS
│   ├── Landing Page
│   ├── Blog, Pricing, Features
│   └── Waitlist + Auth
│
├── Dashboard App (React + Vite) ← NEU, inspiriert von Paperclip
│   ├── Mein Unternehmen (Org Chart, Mission, Goals)
│   ├── Mein Team (Agents, Rollen, Status)
│   ├── Aufgaben (Issues/Tasks Board)
│   ├── Finanzen (Budgets, Kosten, Token-Tracking)
│   ├── Connectors (API Keys, OAuth, Test)
│   ├── Templates (Import/Browse)
│   ├── Aktivitäts-Log (Audit Trail)
│   └── Einstellungen (Profil, Team, Billing)
│
├── API Server (Node.js/Express) ← NEU
│   ├── Auth (Better Auth / Supabase Auth)
│   ├── Agent Lifecycle (Create, Configure, Run, Pause)
│   ├── Heartbeat Engine (Scheduled Agent Runs)
│   ├── Connector Manager (Keys, OAuth, Validation)
│   ├── Cost Tracker (Token Counting per Agent)
│   ├── Approval System (Governance)
│   └── Activity Logger (Audit Trail)
│
├── Adapter Layer ← NEU, Paperclip-Pattern
│   ├── claude-adapter (Claude Code / API)
│   ├── openai-adapter (GPT-4o, o3)
│   ├── mistral-adapter (EU-hosted)
│   ├── ollama-adapter (Local/Self-hosted)
│   └── http-adapter (Custom Endpoints)
│
├── Swiss Connectors ← NEU, unser Moat (CLOSED SOURCE)
│   ├── bexio-connector (Buchhaltung, Rechnungen)
│   ├── deepl-connector (Übersetzung DE/FR/IT/EN)
│   ├── threema-connector (Swiss Messaging)
│   ├── skribble-connector (E-Signatur)
│   ├── zefix-connector (Handelsregister)
│   ├── swiss-post-connector (Adressen, Tracking)
│   └── qrbill-connector (Swiss Rechnungen)
│
├── Basis Connectors ← OPEN SOURCE
│   ├── gmail-connector
│   ├── slack-connector
│   ├── notion-connector
│   ├── github-connector
│   ├── hubspot-connector
│   └── stripe-connector
│
└── Database (Supabase/Postgres)
    ├── Core Tables (companies, agents, tasks, goals...)
    ├── Connector Tables (credentials, configs)
    ├── Audit Tables (activity_log, cost_events)
    └── Auth Tables (users, sessions)
```

### Tech Stack

| Layer | Technologie | Warum |
|-------|------------|-------|
| Marketing Site | Next.js 15, Tailwind v4 | Besteht bereits, SEO-optimiert |
| Dashboard UI | React, Vite, shadcn/ui | Schnell, modern, Paperclip-Pattern bewährt |
| API Server | Node.js, Express, TypeScript | Paperclip-Pattern, adapter-kompatibel |
| Database | Supabase (Postgres) | Schon eingerichtet, Auth inklusive, Swiss-hosted möglich |
| ORM | Drizzle | Schon im Projekt, type-safe, Paperclip nutzt es auch |
| Auth | Supabase Auth | Schon gebaut, OAuth Flows ready |
| Hosting | Vercel (Marketing) + Railway/Fly (API) | Günstig, skalierbar |
| Realtime | Supabase Realtime | Live-Updates im Dashboard |

### Was wir von Paperclip übernehmen (als Referenz)

| Pattern | Was | Wie wir es anpassen |
|---------|-----|---------------------|
| Adapter System | Pluggable LLM Runtimes | Gleiche Architektur, weniger Adapter zum Start |
| Heartbeat Engine | Scheduled Agent Runs | Vereinfacht, Cron-basiert |
| Cost Tracking | Token → CHF pro Agent | CHF statt USD, Bexio-Integration |
| Activity Log | Immutable Audit Trail | Deutsch, nDSG-konform |
| Secrets Management | Verschlüsselte Key-Speicherung | AES-256, gleich wie Paperclip |
| Issue System | Task Board mit Status | Vereinfacht, KMU-friendly |
| Company Templates | Importierbare Configs | Swiss Branchen-Templates |
| Governance | Approval-System | Vereinfacht, Board = Kunde |

### Was wir NICHT übernehmen

| Paperclip Feature | Warum nicht |
|-------------------|-------------|
| Self-hosted CLI | Unsere Kunden sind keine Devs |
| Embedded Postgres | Wir nutzen Supabase Cloud |
| Plugin SDK | Overkill für MVP, später |
| Multi-Company | Später, nicht zum Start |
| Git Worktrees | Zu technisch für KMU |
| OpenClaw/Codex Adapter | Nicht relevant für Swiss KMU |

---

## 4. DASHBOARD — UX VISION

### Design-Prinzipien

1. **Deutsch zuerst** — Kein "Issues", sondern "Aufgaben". Kein "Agents", sondern "Team-Mitglieder" oder "Agents" (ist inzwischen eingedeutscht).
2. **3-Klick-Regel** — Alles innerhalb von 3 Klicks erreichbar.
3. **Mobile First** — KMU-Besitzer checken das morgens auf dem Handy.
4. **Apple-Ästhetik** — Clean, viel Weissraum, KaderOS Deep Blue (#000088).
5. **Kein Jargon** — "Dein AI-Team" statt "Multi-Agent Orchestration".

### Navigation (Sidebar)

```
🏢 Mein Unternehmen
👥 Team (Agents)
📋 Aufgaben
🎯 Ziele
💰 Finanzen
🔌 Connectors
📦 Templates
📊 Aktivität
⚙️ Einstellungen
```

### Onboarding Flow (3 Schritte)

```
Schritt 1: "Wie heisst dein Unternehmen?"
→ Name, Branche, Sprache

Schritt 2: "Wähl dein Starter-Team"
→ Template auswählen (Agentur, Treuhand, Startup, Solo)
→ Oder leer starten

Schritt 3: "Verbinde deine Tools"
→ LLM Key einfügen (OpenAI oder Anthropic)
→ Optional: Bexio, Gmail, etc.
→ "Los geht's"
```

---

## 5. SWISS TEMPLATES

### Format

Jedes Template ist ein JSON/MD-Paket:

```
templates/swiss-agentur/
├── manifest.json      → Name, Beschreibung, Branche, Agent-Anzahl
├── agents/
│   ├── ceo.md         → System Prompt, Rolle, Skills, Connectors
│   ├── cfo.md         → Bexio-Integration, Budget-Überwachung
│   ├── sales.md       → Apollo, LinkedIn, Outreach
│   ├── content.md     → Social Media, Blog, SEO
│   └── dev.md         → Code Review, Deployments
├── goals/
│   └── default.md     → Starter-Ziele für die Branche
└── playbooks/
    └── onboarding.md  → Erste Woche Automations
```

### Starter-Templates (Launch)

| Template | Agents | Zielgruppe |
|----------|--------|------------|
| **Side Hustle** | 2 (Allrounder + Assistent) | Erste Gründung, noch kein Team |
| **Startup** | 4 (CEO, CTO, Sales, Content) | Junge Founder die skalieren |
| **Agentur** | 5 (CEO, PM, Designer, Dev, Content) | 1-3 Mann Agenturen die 10x wollen |
| **Freelancer Pro** | 3 (Assistent, Buchhalter, Content) | Freelancer die wie eine Firma auftreten wollen |
| **E-Commerce** | 4 (Shop Manager, Kundendienst, Marketing, Logistik) | Online-Shop Gründer |

---

## 6. CONNECTOR ARCHITEKTUR

### Wie es funktioniert

```
Kunde klickt "Verbinden" bei Bexio
    → OAuth Flow startet (kaderos.io → bexio.com → Redirect zurück)
    → Access Token wird AES-256 verschlüsselt in DB gespeichert
    → Agent "CFO" bekommt Zugriff auf Bexio-Adapter
    → Agent kann jetzt Rechnungen lesen, erstellen, Mahnungen senden
    → Alle Aktionen im Aktivitäts-Log sichtbar
```

### Connector-Kategorien

**Phase 1 — Launch (Woche 1-4):**
- OpenAI, Anthropic, Mistral (LLM — API Key)
- Gmail (OAuth)
- Notion (OAuth)
- GitHub (OAuth)
- DeepL (API Key)

**Phase 2 — Swiss (Woche 5-8):**
- Bexio (OAuth) ← **Killer Feature**
- Stripe + TWINT (API Key)
- Swiss QR-bill (Library)
- Zefix (Public REST)

**Phase 3 — Erweiterung (Woche 9-12):**
- Threema Gateway (API Key)
- Skribble (API Key)
- Slack (OAuth)
- HubSpot (OAuth)
- Swiss Post (API Key)
- LinkedIn (OAuth)

---

## 7. OPEN CORE STRATEGIE

### Public GitHub Repo (AGPLv3)

```
kaderos/
├── packages/core/          → Agent Engine, Heartbeats, Tasks
├── packages/db/            → Core Schema (Drizzle)
├── packages/adapters/      → OpenAI, Anthropic, Mistral, Ollama
├── packages/connectors/    → Gmail, Notion, GitHub, Slack
├── apps/dashboard/         → Basis Dashboard UI
├── apps/cli/               → npx kaderos onboard
├── templates/community/    → 2-3 Basis-Templates
└── docs/                   → Setup, API Docs
```

### Closed Source (Cloud-Only)

```
kaderos-cloud/ (privat)
├── connectors/swiss/       → Bexio, Threema, Skribble, DeepL, QR-bill, Zefix
├── templates/premium/      → Treuhand, Agentur, E-Commerce (5+)
├── features/
│   ├── team-management/    → Multi-User, Rollen
│   ├── analytics/          → Usage Analytics, Reports
│   ├── white-label/        → Custom Branding für Agenturen
│   └── priority-support/   → SLA, Onboarding-Call
└── infra/                  → Deployment, Monitoring, Billing
```

---

## 8. PLAN — PHASEN

### Phase 0: Foundation (Woche 1-2)
> Ziel: Lauffähiges Dashboard mit echten Agents

- [ ] Paperclip Codebase studieren, Patterns extrahieren
- [ ] Dashboard App aufsetzen (React + Vite + shadcn/ui)
- [ ] API Server aufsetzen (Express + Drizzle + Supabase)
- [ ] Auth Flow verbinden (Supabase Auth → Dashboard)
- [ ] Agent CRUD (Erstellen, Bearbeiten, Löschen, Status)
- [ ] Adapter System bauen (Claude + OpenAI zum Start)
- [ ] Erster Agent-Run: Heartbeat → Agent wacht auf → macht was → reportet zurück

### Phase 1: Core Features (Woche 3-4)
> Ziel: Nutzbare Plattform für Beta-User

- [ ] Task/Aufgaben Board (Erstellen, Zuweisen, Status)
- [ ] Goal/Ziele System (Company Mission → Agent Goals)
- [ ] Connector Infrastructure (Key Storage, OAuth Flow, Test)
- [ ] Connectors: OpenAI, Anthropic, Gmail, Notion, DeepL
- [ ] Activity Log (Audit Trail aller Agent-Aktionen)
- [ ] Cost Tracking (Token → CHF pro Agent)
- [ ] Onboarding Flow (3-Schritte Wizard)
- [ ] 2 Templates (Solo Founder, Startup)

### Phase 2: Swiss Moat (Woche 5-8)
> Ziel: Swiss-Unique Features die kein Wettbewerber hat

- [ ] Bexio Connector (OAuth + Rechnungen + Debitoren)
- [ ] Swiss QR-bill Generation
- [ ] Zefix Integration (Handelsregister-Lookup)
- [ ] Stripe + TWINT Payments
- [ ] 3 weitere Templates (Agentur, Treuhand, E-Commerce)
- [ ] Deutsche UI komplett
- [ ] Mobile-responsive Dashboard
- [ ] Budget Alerts (Agent pausiert wenn Limit erreicht)

### Phase 3: Growth (Woche 9-12)
> Ziel: Monetization + Marketing-Maschine

- [ ] Billing System (Stripe Subscriptions, CHF)
- [ ] Threema, Skribble, Swiss Post Connectors
- [ ] Team Management (Multi-User pro Company)
- [ ] CLI: `npx kaderos onboard` (Open Source Version)
- [ ] Public GitHub Repo (Open Core)
- [ ] ProductHunt Launch
- [ ] 8 SEO Blog Posts
- [ ] TikTok Content Machine (3-4 Videos/Tag)

### Phase 4: Scale (Monat 4-6)
> Ziel: Product-Market Fit + erste zahlende Kunden

- [ ] Approval System (Agent fragt vor grossen Entscheidungen)
- [ ] Plugin System (Community Extensions)
- [ ] White-Label für Agenturen
- [ ] Analytics Dashboard (Usage, Performance, ROI)
- [ ] Docs Site (Starlight)
- [ ] LinkedIn Marketing starten (mit Zahlen als Beweis)
- [ ] Swisspreneur Community Outreach
- [ ] Zurich AI Conference (28. Mai 2026)

---

## 9. ERFOLGSMETRIKEN

### Woche 4 (Phase 1 fertig)
- [ ] Dashboard live auf kaderos.io
- [ ] 5 Beta-User testen aktiv
- [ ] 1 Agent-Run pro User funktioniert End-to-End

### Woche 8 (Phase 2 fertig)
- [ ] Bexio Connector live
- [ ] 20 Beta-User
- [ ] 3 Templates verfügbar
- [ ] Erste Waitlist-Conversions zu Beta

### Woche 12 (Phase 3 fertig)
- [ ] Billing live, erste zahlende Kunden
- [ ] GitHub Repo public, 100+ Stars
- [ ] ProductHunt Launch done
- [ ] 50+ registrierte User

### Monat 6 (Phase 4 fertig)
- [ ] 200+ registrierte User
- [ ] 20+ zahlende Kunden
- [ ] CHF 2'000+ MRR
- [ ] 500+ GitHub Stars

---

## 10. RISIKEN & MITIGATION

| Risiko | Impact | Mitigation |
|--------|--------|------------|
| Paperclip baut Swiss Features | Hoch | Unwahrscheinlich — zu nischig für US-Firma. Speed matters. |
| Bexio API Approval dauert lang | Mittel | Sofort beantragen. Parallel andere Connectors bauen. |
| Junge Founder haben kein Budget | Mittel | Free Tier + CHF 49 ist weniger als 1 Stunde Freelancer. ROI-Messaging. |
| Technische Komplexität | Mittel | Paperclip-Patterns übernehmen, nicht von null. |
| Zu wenig Reichweite | Mittel | TikTok + Open Source + ProductHunt parallel. |
| Datenschutz-Bedenken | Mittel | Swiss Datacenter, BYOK, nDSG-konform kommunizieren. |

---

*Erstellt: 3. April 2026*
*Von: Atlas für Thesh*
*Status: Draft — wartet auf Freigabe*
