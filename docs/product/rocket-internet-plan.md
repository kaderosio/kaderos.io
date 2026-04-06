# KaderOS — Rocket Internet Plan

> **Prinzip:** Was bei CrewAI funktioniert → kopieren → auf Schweiz/KMU/Deutsch anpassen → erweitern.
> **Ziel:** KaderOS wird das "CrewAI für Schweizer KMU" — gleiche Power, aber verständlich, in CHF, auf Deutsch.

---

## Teil 1: Was wir von CrewAI übernehmen

### 1.1 Website-Struktur (komplett neu)

**CrewAI hat:**
- Hero mit klarem Value Prop + 2 CTAs
- Logo-Carousel (Social Proof)
- 3-Säulen Features (Easy / Trusted / Scalable)
- Case Studies mit Metriken
- Platform-Übersicht (4 Pillars)
- Testimonials
- Pricing Page

**KaderOS Adaption:**

#### Navigation (neu)
```
Logo | Produkt | Preise | Docs | Ressourcen | Login | Kostenlos starten
```

#### Homepage Sections (in dieser Reihenfolge)

**1. Hero**
- Headline: "Dein AI-Team. Für dein Unternehmen."
- Sub: "4 Agents. CHF 49/Monat. Arbeiten während du schläfst."
- CTA 1: "Kostenlos starten" → /signup
- CTA 2: "Demo ansehen" → /demo (Video oder Demo-Login)
- Hintergrund: Dashboard-Screenshot (echtes Dashboard, kein Mockup)

**2. Social Proof Bar**
- "Gebaut für Schweizer KMU"
- Logos: Wenn keine echten Kunden → "Vertraut von X Unternehmen" (erst nach ersten Kunden)
- Alternativ: "Open Source auf GitHub" + Star-Count + "Swiss Made Software" Badge

**3. Wie es funktioniert (3 Steps)**
- Step 1: "Team zusammenstellen" — Screenshot Template-Auswahl
- Step 2: "Aufgaben verteilen" — Screenshot Kanban
- Step 3: "Ergebnisse ernten" — Screenshot Finanzen/Activity

**4. Features (4 Säulen — analog CrewAI)**

| Säule | CrewAI | KaderOS Adaption |
|-------|--------|-----------------|
| **Einfach** | Visual Editor, No-Code | "Kein Code nötig. Templates statt Programmieren." |
| **Vertrauenswürdig** | Tracing, Training, Guardrails | "Jede Entscheidung geloggt. Du behältst die Kontrolle." |
| **Skalierbar** | LLM Config, RBAC, Serverless | "Von 1 bis 25 Agents. Budget in CHF. Swiss Hosting." |
| **Swiss** | — (gibt's nicht) | "nDSG-konform. CHF. Bexio. QR-Rechnung." |

**5. Platform-Übersicht (4 Pillars)**
- **Orchestrieren** → Heartbeat Engine, Automation, Scheduling
- **Bauen & Integrieren** → Agent Builder, Connectors, Knowledge Base
- **Beobachten & Optimieren** → Execution Trace, Activity Log, Decisions
- **Verwalten & Skalieren** → Budget, Team, Billing, Templates

**6. Demo-Section**
- "Schau dir an, was ein AI-Team in 5 Minuten erledigt"
- Embedded Video ODER "Demo-Login testen" Button
- Demo-Credentials: demo@kaderos.io / Demo2026!

**7. Testimonials / Case Studies**
- Phase 1: "Was KaderOS ist / nicht ist" (ehrlich, wie jetzt)
- Phase 2: Echte Kunden-Zitate (nach ersten Consulting-Aufträgen)
- Format: Foto + Name + Firma + Zitat + Metrik

**8. Pricing Preview**
- 3 Karten: Community (gratis), Pro (CHF 49), Team (CHF 149)
- "Alle Preise in CHF. Keine versteckten Kosten."
- CTA: "Kostenlos starten"

**9. Footer**
- Produkt: Features, Preise, Docs, Changelog
- Ressourcen: Blog, Templates, API Docs
- Unternehmen: Über uns, Kontakt, Impressum, Datenschutz
- Community: GitHub, Discord/Slack
- Newsletter-Signup
- "Swiss Made Software" Badge

#### Weitere Seiten

| Seite | CrewAI hat | KaderOS Adaption |
|-------|-----------|-----------------|
| `/pricing` | 3 Tiers + Vergleichstabelle | Gleich, aber CHF + "Consulting" Tier |
| `/docs` | Full Documentation | Deutsch + English Docs |
| `/blog` | Engineering Blog | SEO Blog (Deutsch) — existiert bereits |
| `/templates` | — | Template Gallery mit Preview |
| `/demo` | — | Demo-Login oder Video |
| `/changelog` | — | Existiert bereits |
| `/enterprise` | AMP Factory | "Für Agenturen & KMU ab 20 MA" |

---

### 1.2 Product Features (was wir bauen müssen)

#### 🧠 Priorität 1: AGENT BRAIN INTEGRATION (unser Killer Feature)

**Was CrewAI hat:** Simple Unified Memory mit Vektor-Suche + Recency/Importance Scoring.

**Was WIR haben (bereits gebaut, läuft auf Railway):**

Der **Agent Brain** — ein 7-Schichten menschenähnliches Gedächtnis. Das ist KEIN CrewAI-Klon. Das ist eine **andere Liga:**

| Schicht | Was sie tut | CrewAI hat das? |
|---------|-------------|----------------|
| 1. Perception Gate | Bewertet jede Info: Emotion, Neuheit, Dringlichkeit, Vertrauen | ❌ Nein |
| 2. Working Memory | 7-Item Buffer wie beim Menschen | ❌ Nein |
| 3. Episodisches Gedächtnis | Konkrete Erinnerungen mit Kontext | ⚠️ Simpel |
| 4. Knowledge Graph | Entitäten + Beziehungen (spaCy Entity Extraction) | ❌ Nein |
| 5. Prozedurales Gedächtnis | Muster durch Wiederholung (ab 3x) | ❌ Nein |
| 6. Predictive Engine | Proaktive Alerts alle 60 Min | ❌ Nein |
| 7. Dream Cycle | Nacht-Job 02:00 — verdichten, vergessen, kreativ verknüpfen | ❌ Nein |

**Brain API:** `https://agent-brain-production-1064.up.railway.app`
**Workspace:** `d3f5f4c3-0bb1-48a2-a8e4-5fd79ddd5565`
**Stack:** FastAPI + PostgreSQL + pgvector + spaCy (Deutsch) + APScheduler
**Kosten:** CHF 5/Monat (Railway)
**Repo:** github.com/kaderosio/agent-brain

**Was gebaut werden muss (Integration in KaderOS Dashboard):**

1. **Jeder KaderOS Agent bekommt automatisch Brain-Memory**
   - Bei Agent-Erstellung: Brain API registriert Agent im Workspace
   - Bei jedem Run: Brain recall → relevante Memories als System Context
   - Nach jedem Run: Brain store → Output + Kontext speichern
   - Integration in `/api/agents/[id]/run` und `/api/chat`

2. **Dashboard: "Gedächtnis" Page**
   - `apps/web/app/dashboard/gedaechtnis/page.tsx`
   - Zeigt alle Memories der Company (Brain recall mit "alles")
   - Filter: Pro Agent, nach Typ (episodic/semantic/procedural)
   - Entity Graph Visualisierung (Entitäten + Beziehungen)
   - Proaktive Alerts anzeigen (Brain predict)
   - Memory manuell hinzufügen (Brain store)

3. **Agent-Edit: "Gedächtnis" Tab**
   - Zeigt agent-spezifische Memories
   - Memory an/aus Toggle
   - Letzte 10 Memories + Relevanz-Score
   - "Vergessen" Button (Memory löschen)

4. **Knowledge Base als Brain-Feature**
   - PDF/CSV/Text Upload → Text extrahieren → Brain store mit source_trust=0.9
   - Wird automatisch Teil des Gedächtnisses
   - Kein separates pgvector Setup nötig — Brain HAT bereits pgvector
   - `apps/web/app/dashboard/wissensbasis/page.tsx` — Upload UI
   - `apps/web/app/api/knowledge/upload/route.ts` — Parse + Brain store

5. **Meeting Room: Brain Context anzeigen**
   - Vor jeder Antwort: "Agent erinnert sich an X relevante Informationen"
   - Trace Sidebar: Welche Memories wurden abgerufen

**Dateien:**
- `apps/web/lib/brain.ts` — Brain API Client (store, recall, predict)
- `apps/web/app/api/brain/recall/route.ts` — Proxy zu Brain API
- `apps/web/app/api/brain/store/route.ts` — Proxy zu Brain API
- `apps/web/app/api/knowledge/upload/route.ts` — File Upload → Brain store
- `apps/web/app/dashboard/gedaechtnis/page.tsx` — Memory Dashboard
- `apps/web/app/dashboard/wissensbasis/page.tsx` — Knowledge Upload UI
- Integration: `/api/agents/[id]/run`, `/api/chat`, `/api/heartbeat/tick`

**Marketing-Messaging:**
- "Dein AI-Team vergisst nichts. 7 Gedächtnis-Schichten. Wie ein menschliches Gehirn."
- "Perception Gate: Dein Agent weiss was wichtig ist — bevor du es sagst."
- "Dream Cycle: Nachts verdichtet dein Team sein Wissen. Jeden Morgen klüger."
- "Predictive Alerts: Dein Agent warnt dich BEVOR es ein Problem wird."

**Das ist unser MOAT.** CrewAI kann die Swiss Connectors kopieren. Aber einen 7-Schichten Brain mit Dream Cycle und Predictive Engine? Das kopiert niemand in 6 Monaten.

#### Priorität 3: Flows / Workflows (CrewAI Core Feature)
**Was CrewAI hat:** Multi-Step Workflows mit State, Conditional Routing, Parallel Execution, Human-in-the-Loop.

**KaderOS Adaption (vereinfacht für KMU):**
- "Workflows" Page im Dashboard
- Visual: Einfacher Step-by-Step Builder (kein Drag & Drop zunächst)
- Step 1 → Step 2 → Step 3 (linear oder conditional)
- Jeder Step = ein Agent + ein Prompt
- Output von Step 1 wird Input für Step 2
- Human-in-the-Loop: "Warte auf Genehmigung" Step-Typ
- Trigger: Manuell, Cron, oder Webhook

**Dateien:**
- `apps/web/app/dashboard/workflows/page.tsx` — Workflow Builder
- `apps/web/app/api/workflows/route.ts` — CRUD
- `apps/web/app/api/workflows/[id]/run/route.ts` — Execute Workflow
- DB: `workflows` + `workflow_steps` Tabellen
- Integration in Heartbeat: Workflows können per Cron getriggert werden

#### Priorität 4: Visual Agent Builder
**Was CrewAI hat:** Studio — Visual Editor für Agents, Drag & Drop Tools, No-Code.

**KaderOS Adaption:**
- Erweiterter Agent-Edit: Tabs statt einfaches Modal
  - Tab 1: Profil (Name, Rolle, Avatar)
  - Tab 2: Konfiguration (System Prompt, Model, Tools)
  - Tab 3: Wissensbasis (welche Dokumente)
  - Tab 4: Gedächtnis (an/aus, letzte Memories)
  - Tab 5: Budget & Automation (Limit, Heartbeat)
  - Tab 6: Statistiken (Runs, Tokens, Kosten, Erfolgsrate)
- Keine Drag & Drop nötig — Tabs sind für KMU verständlicher

#### Priorität 5: Erweiterte Connectors
**Was CrewAI hat:** Gmail, Slack, Salesforce, 100+ Tools

**KaderOS Adaption (Swiss Focus):**
- Phase 1: DeepL ✅, Gmail, Notion
- Phase 2: Bexio (Swiss Buchhaltung), Slack
- Phase 3: Zefix, Swiss QR-Bill, Threema
- Jeder Connector = Adapter in `lib/adapters/` + UI in Connectors Page

#### Priorität 6: Run Parameters
**Was CrewAI hat:** Custom Input-Variablen pro Agent-Run.

**KaderOS Adaption:**
- Agent-Config hat "Parameter" Feld (JSON Schema)
- Beim manuellen Run: Formular mit den definierten Parametern
- Beispiel: Sales-Agent hat Parameter `{firma: string, branche: string}`
- User füllt Formular aus → Agent bekommt strukturierten Input

#### Priorität 7: Tracing / Observability (erweitern)
**Was CrewAI hat:** Step-by-Step Execution Replay, Tool Calls sichtbar.

**KaderOS Adaption:**
- Erweiterte Execution Trace: Nicht nur Dauer/Model, sondern:
  - Welche Knowledge-Chunks wurden genutzt
  - Welche Memories wurden abgerufen
  - Tool-Calls (DeepL Übersetzung, etc.)
  - Token-Breakdown (Input vs Output)
  - Kosten pro Step
- Run-History pro Agent (Timeline-View)

---

## Teil 2: Pricing (CrewAI-Adaption auf CHF)

**CrewAI:** Free (50 exec) / $25/mo (100 exec) / Enterprise

**KaderOS Adaption:**

| | Community | Pro | Team | Agency | Enterprise |
|---|---|---|---|---|---|
| **Preis** | CHF 0 | CHF 49/Mo | CHF 149/Mo | CHF 349/Mo | Auf Anfrage |
| **Agents** | 3 | 10 | 25 | Unbegrenzt | Unbegrenzt |
| **Runs/Monat** | 50 | 500 | 2'000 | 10'000 | Unbegrenzt |
| **Knowledge** | 5 Docs | 50 Docs | 200 Docs | Unbegrenzt | Unbegrenzt |
| **Memory** | — | ✓ | ✓ | ✓ | ✓ |
| **Workflows** | 1 | 5 | 20 | Unbegrenzt | Unbegrenzt |
| **Connectors** | 2 | Alle | Alle | Alle | Custom |
| **Users** | 1 | 2 | 5 | 10 | Unbegrenzt |
| **Support** | Community | Email | Priority | Dedicated | On-Site |
| **Swiss Connectors** | — | ✓ | ✓ | ✓ | ✓ |
| **BYOK** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Annual** | — | CHF 39/Mo | CHF 119/Mo | CHF 279/Mo | — |

**Neu: Consulting Tier**
- CHF 3'000 — 50'000 einmalig
- Custom AI-Setup für dein Unternehmen
- Nicht auf der Pricing-Page, aber auf /enterprise
- "Wir richten dein AI-Team ein. Du lehnst dich zurück."

---

## Teil 3: Implementation Roadmap

### Sprint 1: 🧠 Agent Brain Integration (3-4 Tage) — HÖCHSTE PRIORITÄT
- [ ] `lib/brain.ts` — Brain API Client (store, recall, predict, identity)
- [ ] Agent-Run Integration: Brain recall vor Run → Memories als System Context
- [ ] Agent-Run Integration: Brain store nach Run → Output speichern
- [ ] Chat Integration: Brain recall vor Antwort → Context enrichment
- [ ] Chat Integration: Brain store nach Antwort → Gespräch speichern
- [ ] Heartbeat Integration: Brain store/recall bei automatischen Runs
- [ ] Dashboard: "Gedächtnis" Page (Memory-Liste, Entity-Graph, Alerts)
- [ ] Dashboard: "Wissensbasis" Page (PDF/Text Upload → Brain store)
- [ ] Agent-Edit: "Gedächtnis" Tab (Memories anzeigen, Toggle, Vergessen)
- [ ] Meeting Room: "Agent erinnert sich an X" Anzeige + Trace
- [ ] Nav Update: "Gedächtnis" + "Wissensbasis" hinzufügen

### Sprint 2: Website Rewrite (2-3 Tage)
- [ ] Neue Homepage nach obiger Struktur (Brain als Hero Feature)
- [ ] Pricing Page mit Vergleichstabelle
- [ ] /demo Page (Demo-Login oder Video)
- [ ] /enterprise Page (Consulting CTA)
- [ ] Template Gallery (/templates mit Preview)
- [ ] Footer + Navigation Update
- [ ] Brain-Feature prominent auf Landing Page ("7 Gedächtnis-Schichten")

### Sprint 4: Workflows (3-4 Tage)
- [ ] `workflows` + `workflow_steps` DB Tabellen
- [ ] Workflow CRUD API
- [ ] Workflow Execution Engine (Step-by-Step mit State)
- [ ] Dashboard: Workflows Page (Builder, Liste, Run)
- [ ] Human-in-the-Loop: "Warte auf Genehmigung" Step
- [ ] Heartbeat Integration: Workflows per Cron triggern

### Sprint 5: Visual Agent Builder (2 Tage)
- [ ] Agent-Edit als Fullpage mit Tabs (statt Modal)
- [ ] Tab: Profil, Config, Knowledge, Memory, Budget, Stats
- [ ] Run-History Timeline pro Agent
- [ ] Statistiken: Erfolgsrate, Avg Tokens, Avg Kosten

### Sprint 6: Connectors (ongoing)
- [ ] Gmail Connector (OAuth + Email senden/lesen)
- [ ] Notion Connector (OAuth + Pages lesen/schreiben)
- [ ] Bexio Connector (OAuth + Rechnungen)
- [ ] Slack Connector (OAuth + Messages)

### Sprint 7: Polish & Launch
- [ ] Run Parameters (Custom Input pro Agent)
- [ ] Erweiterte Tracing (Knowledge Chunks, Memory, Tool Calls)
- [ ] RBAC (Multi-User mit Rollen)
- [ ] Stripe Live-Schaltung
- [ ] ProductHunt Launch
- [ ] TikTok Content Machine

---

## Teil 4: Was uns BESSER macht als CrewAI

| Differenzierung | Detail |
|---|---|
| **🧠 Agent Brain** | 7-Schichten Gedächtnis mit Dream Cycle, Predictive Alerts, Knowledge Graph. CrewAI hat nur simple Vektor-Suche. DAS ist unser Moat. |
| **Perception Gate** | Jede Information wird bewertet: Emotion, Neuheit, Dringlichkeit, Vertrauen. CrewAI speichert alles gleich. |
| **Dream Cycle** | Nachts verdichtet der Brain Wissen, vergisst Unwichtiges, findet kreative Verbindungen. Kein Competitor hat das. |
| **Predictive Engine** | Proaktive Alerts BEVOR es Probleme gibt. Muster-Erkennung ab 3x Wiederholung. |
| **Sprache** | Deutsch-first. Nicht übersetzt — native geschrieben. Entity Extraction auf Deutsch (spaCy de_core_news_md). |
| **Währung** | CHF. Nicht USD umgerechnet. |
| **Compliance** | nDSG-konform. Nicht GDPR-als-Afterthought. |
| **Swiss Connectors** | Bexio, Zefix, QR-Rechnung, Threema — keiner hat das. |
| **KMU-Focus** | Templates für Schweizer Branchen, nicht Fortune 500 Workflows. |
| **Consulting** | Custom AI-Setups für CHF 3K-50K — CrewAI hat nur Self-Service. |
| **Einfachheit** | Tabs statt Visual Editor. Verständlich für Nicht-Techniker. |
| **BYOK** | Bring Your Own Key — keine versteckten LLM-Kosten. |
| **Transparenz** | Kosten in CHF pro Agent pro Monat — kein "Contact Sales". |
| **Open Source** | AGPLv3 Core — CrewAI OSS ist nur das Framework, nicht die Platform. |

---

## Teil 5: Metriken die wir tracken

| Metrik | Ziel Q2 2026 |
|---|---|
| Signups | 200 |
| Aktive User (WAU) | 50 |
| Zahlende Kunden | 20 |
| MRR | CHF 1'500 |
| Consulting Revenue | CHF 15'000 |
| Templates | 10 |
| Connectors | 5 |
| Blog Posts | 20 |
| TikTok Videos | 50 |

---

*Version 1.0 — 6. April 2026*
*Rocket Internet Approach: Copy what works → Adapt for Swiss market → Extend with local moat*
