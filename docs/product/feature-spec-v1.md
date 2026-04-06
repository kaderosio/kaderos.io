# KaderOS Product Feature Spec v1

> **Ziel:** Definiert jede Seite, jeden Screen, jeden Flow den ein User sieht.
> **Referenz:** CrewAI (Visual Editor, Tracing, Enterprise), Paperclip (Org Chart, Tickets, Budget), Relevance AI (Templates, Autonomy Levels)
> **Unsere Differenzierung:** Swiss-First, Deutsch, KMU-tauglich, BYOK, CHF, nDSG

---

## 1. Onboarding Flow

### Screen 1: Willkommen
- "Dein AI-Team in 3 Minuten"
- Email + Passwort (oder GitHub OAuth)
- Sprache: Deutsch (default), English

### Screen 2: Unternehmen erstellen
- Firmenname (Pflicht)
- Branche (Dropdown: Agentur, Startup, Freelancer, E-Commerce, Beratung, Andere)
- Teamgrösse (1, 2-5, 6-20, 20+)
- Währung: CHF (default), EUR

### Screen 3: Template wählen
- 5 Karten mit Preview:
  - **Side Hustle** (2 Agents) — "Für deinen Nebenjob"
  - **Startup** (4 Agents) — "Dein erstes AI-Team"
  - **Agentur** (5 Agents) — "Kreativ-Team auf Autopilot"
  - **Freelancer Pro** (3 Agents) — "Wirke wie eine Firma"
  - **E-Commerce** (4 Agents) — "Shop-Management automatisiert"
- Jede Karte zeigt: Agent-Namen, Rollen, was sie tun
- "Ohne Template starten" Option

### Screen 4: API Key verbinden
- Provider wählen: Anthropic / OpenAI (Toggle)
- API Key eingeben
- "Testen" Button → grüner Haken oder Fehler
- "Überspringen — später verbinden" Link
- → Redirect zum Dashboard

---

## 2. Dashboard: Übersicht (Home)

**Was der User sieht wenn er einloggt.**

### Header
- Firmenname + "Guten Morgen, [Name]"
- Globaler Status-Badge: "3 Agents aktiv" / "1 Entscheidung offen"

### 4 Stat-Cards (oben)
| Card | Wert | Quelle |
|------|------|--------|
| Aktive Agents | Zahl + von Total | `agents` WHERE status=active |
| Offene Tasks | Zahl | `tasks` WHERE status IN (todo, in-progress) |
| Erledigte Tasks (Monat) | Zahl | `tasks` WHERE status=done AND completed_at THIS MONTH |
| Kosten (Monat) | CHF X.XX | `budgets` SUM(spent_chf) THIS MONTH |

### Pending Decisions Widget
- Gelbe Karte: "2 Entscheidungen warten auf dich"
- Liste: Agent-Name + Request + Confidence-Score
- "Genehmigen" / "Ablehnen" Buttons direkt
- Wenn 0: Widget versteckt

### Letzte Aktivität (Feed)
- 10 neueste Einträge aus `activity_log`
- Format: `[Agent-Avatar] Mario hat Task "Angebot erstellen" erledigt — vor 2h`
- `[System] Budget-Warnung: Sales-Agent bei 80% — vor 5h`
- "Alle anzeigen →" Link zu Aktivität

### Nächster Heartbeat
- "Nächster automatischer Run: Morgen 08:00"
- Agents die laufen werden: Liste mit Status-Badge

---

## 3. Team (Agent Management)

### Agent-Karten Grid
Jede Karte zeigt:
- **Avatar** (Farbe + Initial)
- **Name** + **Rolle** (z.B. "Mario — Sales Agent")
- **Status-Badge:** Aktiv (grün) / Pausiert (gelb) / Gestoppt (rot)
- **Stats:** X Tasks erledigt | X offen | CHF X.XX diesen Monat
- **Letzte Aktion:** "Hat 'Lead qualifizieren' erledigt vor 3h"
- **Actions:** Bearbeiten | Pausieren | Chat starten | Löschen

### Agent erstellen / bearbeiten (Modal oder Seite)
- **Name** (Pflicht)
- **Rolle** (Pflicht) — Freitext oder Dropdown (Sales, Marketing, Dev, Support, Admin, Custom)
- **Job-Beschreibung** (Textarea) — Was soll der Agent tun?
- **System Prompt** (Advanced, collapsible) — Technischer Prompt
- **Typ:** Claude / GPT / Custom (Dropdown)
- **Abteilung** (Optional)
- **Berichtet an** (Optional — anderer Agent, für Org Chart)
- **Skills** (Tags) — z.B. "Email", "Recherche", "Texte schreiben"
- **Budget:** CHF [Input] / Monat — Warnung bei [80]% — Auto-Pause bei Limit
- **Heartbeat:** Aktiviert (Toggle) + Frequenz (Täglich 08:00 / Stündlich / Custom Cron)
- **Akzentfarbe** (Color Picker)

### Org Chart View (Toggle)
- Hierarchische Ansicht: Wer berichtet an wen
- Wie Paperclip: CEO → CTO → Dev-Agent
- Drag & Drop zum Umstrukturieren
- Zeigt Delegation-Flows

---

## 4. Meeting Room (Agent Chat)

### Chat-Interface
- Agent-Auswahl (Dropdown links oben)
- Chat-Verlauf mit Markdown-Rendering
- Input-Feld mit Send-Button
- Streaming-Antwort (Token für Token)

### Execution Trace Sidebar (rechts)
- **Live während Agent antwortet:**
  - "Denkt nach..." (Spinner)
  - Token-Zähler (Input: 1.2K, Output: 500)
  - Kosten: CHF 0.03
  - Dauer: 2.4s
  - Model: claude-sonnet-4
- **Nach Antwort:**
  - "Erledigt" Badge
  - Token-Summary
  - "Als Task speichern" Button
  - "An anderen Agent delegieren" Button

### Multi-Agent Chat (Future)
- Mehrere Agents im gleichen Room
- Agent A kann Agent B taggen: "@Mario übernimm das"
- Delegation wird als Task erstellt

---

## 5. Aufgaben (Task Board)

### Kanban Board
5 Spalten:
| Todo | In Progress | Review | Done | Blocked |
|------|-------------|--------|------|---------|

Jede Task-Karte:
- **Titel** (bold)
- **Agent-Badge** (wer ist zugewiesen)
- **Priorität:** Hoch (rot) / Mittel (gelb) / Niedrig (grau)
- **Goal-Badge** (falls verknüpft)
- **Erstellt:** Zeitstempel
- Drag & Drop zwischen Spalten

### Task Detail (Slide-in Panel oder Modal)
- Titel + Beschreibung (editierbar)
- Status (Dropdown)
- Zugewiesener Agent (Dropdown)
- Priorität (Dropdown)
- Verknüpftes Ziel (Dropdown)
- Fälligkeitsdatum (Date Picker)
- **Agent-Output** (wenn automatisch erledigt):
  - System-Kommentar mit Agent-Antwort
  - Token-Usage + Kosten
  - Timestamp
- **Kommentare** (Thread)
- **Aktivitäts-Log** (wer hat wann was geändert)

### Task erstellen
- Schnell-Eingabe oben: Titel + Enter
- Oder Detail-Modal: Titel, Beschreibung, Agent, Priorität, Goal, Deadline

### Automatische Tasks
- Badge: "Automatisch erstellt durch Heartbeat"
- Badge: "Delegiert von [Agent-Name]"
- Filter: "Nur automatische" / "Nur manuelle" / "Alle"

---

## 6. Ziele (Goals)

### Goal Cards
Jede Karte:
- **Titel** + **Beschreibung**
- **Progress Bar** (0-100%)
- **Status Badge:** On Track (grün) / At Risk (gelb) / Behind (rot) / Completed (blau)
- **Owner Agent** (Avatar + Name)
- **Deadline**
- **Tasks:** X/Y erledigt
- **Actions:** Bearbeiten | Löschen

### Goal Detail
- Alle Felder editierbar
- Verknüpfte Tasks (Liste mit Status)
- Progress wird automatisch berechnet (Tasks done / Total)
- Sub-Goals (Parent-Goal Hierarchie)
- Aktivitäts-Log

### Goal erstellen
- Titel (Pflicht)
- Beschreibung
- Owner Agent (Dropdown)
- Deadline (Date Picker)
- Department

---

## 7. Entscheidungen (Decisions) — NEU

### Decision Queue
- **Pending Tab** (default): Offene Entscheidungen die Approval brauchen
- **Approved Tab**: Genehmigte Entscheidungen
- **Denied Tab**: Abgelehnte Entscheidungen
- **Alle Tab**: Komplett-Übersicht

Jede Decision-Karte:
- **Agent-Avatar + Name** (wer hat entschieden/angefragt)
- **Request** (was wurde getan/angefragt)
- **Typ-Badge:** Budget / Deploy / Config / Other
- **Confidence Score** (Balken: 0-100%)
  - Grün: >=80 (auto-approved)
  - Gelb: 50-79 (needs review)
  - Rot: <50 (high risk)
- **Timestamp**
- **Actions (nur bei Pending):**
  - "Genehmigen" (grün) + Optional: Grund
  - "Ablehnen" (rot) + Pflicht: Grund
- **Status Badge:** Pending (gelb) / Approved (grün) / Denied (rot)

### Auto-Approve Regel
- Info-Banner: "Entscheidungen mit Confidence >=80% werden automatisch genehmigt"
- Toggle: Auto-Approve an/aus (in Settings konfigurierbar)

---

## 8. Automation (Heartbeats) — NEU

### Heartbeat-Übersicht
Tabelle / Cards:

| Agent | Frequenz | Nächster Run | Letzter Run | Status | Runs | Actions |
|-------|----------|-------------|-------------|--------|------|---------|
| Mario | Täglich 08:00 | Morgen 08:00 | Heute 08:00 | Completed | 47 | Pause / Edit / Logs |
| Lisa | Täglich 08:00 | Morgen 08:00 | Heute 08:00 | Failed | 12 | Pause / Edit / Logs |

### Heartbeat Detail / Edit (Modal)
- Agent (readonly)
- Frequenz: Täglich / Stündlich / Custom Cron (Dropdown)
- Aktiviert (Toggle)
- Letzte 10 Runs (Mini-Log):
  - Timestamp + Status (Completed/Failed)
  - Task die erledigt wurde
  - Tokens + Kosten
  - Output (expandierbar)
  - Error (wenn Failed, rot)

### "Jetzt ausführen" Button
- Manueller Trigger für einen Agent
- Zeigt Live-Output wie Meeting Room
- Ergebnis: Task erledigt oder Fehler

### Stats
- Total Runs diesen Monat
- Erfolgsrate (%)
- Durchschnittliche Kosten pro Run

---

## 9. Finanzen (Budget & Costs)

### Monats-Übersicht
- **Total ausgegeben:** CHF XX.XX / CHF YYY.YY Budget
- **Progress Bar** (Gesamtbudget)
- **Zeitraum:** Monat-Selector

### Budget pro Agent (Tabelle)
| Agent | Budget | Ausgegeben | Verbleibend | Status | Actions |
|-------|--------|-----------|-------------|--------|---------|
| Mario | CHF 50.00 | CHF 32.50 | CHF 17.50 | 65% | Edit |
| Lisa | CHF 30.00 | CHF 28.80 | CHF 1.20 | 96% ⚠️ | Edit |
| Tom | Kein Limit | CHF 5.20 | ∞ | — | Set Limit |

- Warnung-Badge bei >=80%
- Pausiert-Badge bei 100%

### Cost Log (letzte Einträge)
| Datum | Agent | Task | Model | Tokens | CHF |
|-------|-------|------|-------|--------|-----|
| 06.04 08:02 | Mario | Lead qualifizieren | gpt-4o | 2.4K | 0.04 |
| 06.04 08:01 | Lisa | Blog schreiben | claude-sonnet | 5.1K | 0.08 |

### Budget erstellen / bearbeiten (Modal)
- Agent (Dropdown)
- Monatliches Limit (CHF Input)
- Warnung bei (% Slider, default 80%)
- Auto-Pause bei Limit (Toggle, default On)

---

## 10. Connectors

### Provider Grid
Kategorien: LLM | Produktivität | Swiss | Dev

Jeder Connector:
- **Logo + Name** (z.B. OpenAI, Anthropic, Bexio)
- **Status:** Verbunden (grün) / Nicht verbunden (grau) / Fehler (rot)
- **Letzter Test:** Timestamp + Ergebnis
- **Actions:** Verbinden / Testen / Entfernen

### Connector verbinden (Modal)
- Provider-spezifisch:
  - **API Key Provider** (OpenAI, Anthropic, DeepL): Key-Input + Test
  - **OAuth Provider** (Bexio, Gmail, Notion): "Mit [Provider] verbinden" Button → OAuth Flow
- Verschlüsselung-Hinweis: "Dein Key wird AES-256 verschlüsselt gespeichert"

### Connector Roadmap (Coming Soon)
- Bexio (Swiss Buchhaltung) — "Bald verfügbar"
- Gmail (Email-Automatisierung) — "Bald verfügbar"
- Notion (Wissensmanagement) — "Bald verfügbar"
- Slack (Team-Kommunikation) — "Bald verfügbar"
- DeepL (Übersetzungen) — "Bald verfügbar"

---

## 11. Aktivität (Audit Trail)

### Activity Feed
- Chronologisch, neueste zuerst
- Filter: Alle / Agents / System / User
- Filter: Letzte 24h / 7 Tage / 30 Tage / Custom

Jeder Eintrag:
- **Actor** (Agent-Avatar oder System-Icon oder User-Icon)
- **Action** (menschenlesbar):
  - "Mario hat Task 'Angebot erstellen' erledigt"
  - "System: Budget-Warnung für Lisa (80% erreicht)"
  - "Du hast Entscheidung #42 genehmigt"
  - "Mario hat Task an Lisa delegiert: 'Design Review'"
- **Timestamp** (relativ: "vor 2h" + absolut on hover)
- **Details** (expandierbar): Tokens, Kosten, Model, etc.

### Export
- CSV Download (für Compliance/Audit)

---

## 12. Einstellungen

### Unternehmen
- Firmenname (editierbar)
- Branche
- Währung (CHF/EUR)
- Zeitzone
- Sprache (Deutsch/English)

### Automation
- Auto-Approve Threshold: [80]% (Slider)
- Default Heartbeat Frequenz: Täglich / Stündlich
- Default Budget pro Agent: CHF [50]

### API & Security
- API Keys verwalten (→ Connectors)
- Encryption Status: "AES-256-GCM aktiv"
- Audit Log Export

### Account
- Email ändern
- Passwort ändern
- Account löschen (mit Bestätigung)

### Team (Future)
- Team-Mitglieder einladen
- Rollen: Admin / Editor / Viewer
- Aktivitäts-Log pro User

---

## 13. Landing Page Features (Was wir kommunizieren)

### Feature Blocks (ehrlich, nur was LIVE ist)

**Block 1: AI-Team aufbauen**
- "Erstelle Agents mit Name, Rolle und Auftrag"
- Screenshot: Team-Seite mit Agent-Cards
- Live: Ja

**Block 2: Automatisch arbeiten lassen**
- "Dein Team arbeitet im Hintergrund — jeden Tag"
- Screenshot: Heartbeat-Dashboard mit Run-History
- Live: Ja (nach UI-Build)

**Block 3: Budget in CHF**
- "Setze Limits pro Agent. Pausiert automatisch."
- Screenshot: Finanzen-Seite mit Budget-Balken
- Live: Ja (nach UI-Build)

**Block 4: Governance eingebaut**
- "Jede Entscheidung wird geloggt. Du behältst die Kontrolle."
- Screenshot: Decisions-Queue mit Approve/Deny
- Live: Ja (nach UI-Build)

**Block 5: Meeting Room**
- "Sprich mit deinem Team in Echtzeit"
- Screenshot: Chat mit Mario
- Live: Ja

**Block 6: Swiss Made**
- "Gehostet in der Schweiz. CHF. nDSG-konform."
- Kein Screenshot, Trust-Badge
- Live: Ja

---

## Feature Priority Matrix

### Must Have (MVP — vor erstem Kunden)
1. Decisions Page (Approve/Deny UI)
2. Heartbeats Page (Automation Dashboard)
3. Budget Create/Edit UI (Finanzen)
4. "Blocked" Column im Kanban
5. Agent Edit Modal (Team)
6. Goal Edit/Delete UI (Ziele)
7. Error Handling auf allen Pages
8. Security: Company Ownership Checks
9. Onboarding Template Selection (Screen 3)

### Should Have (vor Launch)
10. Execution Trace in Meeting Room
11. Activity Feed auf Overview
12. Cost Log in Finanzen
13. Task Detail Panel mit Agent-Output
14. "Jetzt ausführen" Button
15. CSV Export für Audit
16. Password Reset Flow
17. Org Chart View (Team)

### Nice to Have (nach Launch)
18. Multi-Agent Chat
19. Drag & Drop Org Chart
20. Custom Cron UI
21. Dark Mode
22. Mobile App
23. Connector OAuth Flows (Bexio, Gmail)
24. Template Gallery mit Preview
25. Billing (Stripe)

---

## User Flows (End-to-End)

### Flow 1: Founder erstellt erstes AI-Team
```
Signup → Firma erstellen → Template "Startup" wählen → API Key eingeben
→ Dashboard: 4 Agents stehen bereit → Erster Task erstellen → Agent zuweisen
→ Heartbeat läuft um 08:00 → Task erledigt → User sieht Ergebnis in Aufgaben
```

### Flow 2: Agent braucht Approval
```
Heartbeat läuft → Agent erledigt Task mit Confidence 65%
→ Decision erstellt (status: pending) → User sieht gelbe Notification auf Overview
→ Klickt auf Decisions → Sieht Request + Confidence → Genehmigt mit Grund
→ Decision status: approved → Activity Log Entry
```

### Flow 3: Budget-Limit erreicht
```
Agent Mario hat CHF 48 von 50 verbraucht
→ Nächster Heartbeat: Budget-Check → CHF 48 + ~2 = über Limit
→ Agent wird geskippt → Activity: "Budget aufgebraucht"
→ User sieht ⚠️ Badge auf Finanzen → Erhöht Budget → Nächster Run geht durch
```

### Flow 4: Agent delegiert an Agent
```
CEO-Agent bekommt Task "Quartalsbericht erstellen"
→ CEO-Agent delegiert Recherche an Research-Agent
→ Neuer Task erstellt (status: todo, agent: Research-Agent)
→ Decision geloggt: "CEO delegiert an Research: Quartalszahlen sammeln"
→ Nächster Heartbeat: Research-Agent picked Task auf → Erledigt
→ Output als Kommentar im Task → CEO-Agent sieht Ergebnis
```

---

*Version 1.0 — 6. April 2026*
*Referenzen: CrewAI (Studio, Tracing, Enterprise), Paperclip (Org Chart, Tickets, Budget), Relevance AI (Templates, Autonomy Levels)*
