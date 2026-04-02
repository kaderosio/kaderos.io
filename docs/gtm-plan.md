# KaderOS — Go-to-Market Plan

> **Ziel:** 200 Waitlist-Signups in 14 Tagen. 50 Beta-User in 6 Wochen. Erste zahlende Kunden in Woche 8.
> **Erstellt:** 2. April 2026
> **Status:** Ready to Execute

---

## Inhaltsverzeichnis

1. [Marktanalyse](#1-marktanalyse)
2. [Ideal Customer Profile (ICP)](#2-ideal-customer-profile-icp)
3. [Positionierung & Messaging](#3-positionierung--messaging)
4. [Waitlist-Strategie](#4-waitlist-strategie)
5. [Marketing-Kanäle](#5-marketing-kanäle)
6. [Content-Strategie](#6-content-strategie)
7. [Launch-Sequenz](#7-launch-sequenz)
8. [Metriken & KPIs](#8-metriken--kpis)
9. [Budget](#9-budget)
10. [Woche-für-Woche Playbook](#10-woche-für-woche-playbook)

---

## 1. Marktanalyse

### Schweizer AI-Markt 2026

| Metrik | Wert | Quelle |
|--------|------|--------|
| AI Adoption Rate Schweiz | 46% (vs. 42% EU-Durchschnitt) | Swiss AI Report 2025 |
| AI Marktgrösse CH | CHF 2.15 Mrd. (2025), CAGR 18.5% | Statista / Z Digital |
| ICT Markt Schweiz total | USD 44.7 Mrd. (2025), CAGR 5.58% | Mordor Intelligence |
| Anzahl KMU in der Schweiz | 624'219 (99.7% aller Firmen) | BFS/STATENT 2023 |
| Davon tech/digital-affin (est.) | ~31'000 KMU | 5% von 624k |
| Digital-/Marketing-Agenturen CH | ~800–1'200 | Sortlist/Clutch |
| ICT-Unternehmen Grossraum Zürich | ~5'000 (50k Angestellte) | S-GE |
| Neugründungen 2025 | 55'654 (+5.1% YoY) — Rekord | kmu.admin.ch |
| LinkedIn User Schweiz | 5.3 Mio. (58% Penetration) | onlineKarma 2025 |
| Firmen die AI-Investment erhöhen | 30% planen +20-39% | Deloitte CH |
| KMU Digitalisierungsbudget | CHF 10'000–100'000+ | kmu.admin.ch |

### Markt-Trend: Von Copilots zu Agents

> *"2026 ist das Jahr, in dem Schweizer KMU von Copilots zu Agents wechseln — autonome digitale Teammitglieder die nicht nur helfen, sondern die Arbeit besitzen."*

**Was das für KaderOS bedeutet:**
- Der Markt reift genau jetzt von "AI ausprobieren" zu "AI systematisch einsetzen"
- 46% nutzen AI, aber fast niemand orchestriert mehrere Agents
- Riesige Lücke: Es gibt kein Swiss-natives Tool dafür

### Wettbewerb

| Produkt | Stärke | Schwäche | Bedrohung für uns |
|---------|--------|----------|-------------------|
| **Paperclip.ing** | Open Source, 44k GitHub Stars, starke Community | Kein Swiss Focus, kein nDSG, USD only | Hoch — aber kein Swiss Differentiator |
| **CrewAI** | Python-native, Dev-Community | Closed Source, kein Governance, kein Budget-Tracking | Mittel — anderes Segment (nur Devs) |
| **AutoGen (Microsoft)** | Enterprise-Backing, stabil | Komplex, Enterprise-fokussiert, US Cloud | Niedrig — zu Enterprise für unsere Zielgruppe |
| **LangGraph** | Flexibel, Dev-friendly | Framework, kein Produkt, kein UI | Niedrig — Komplementär, nicht kompetitiv |

### Unsere Position

```
                    Swiss-Native
                        ↑
                        │
         KaderOS ●      │
                        │
    Open Source ←────────┼────────→ Closed Source
                        │
                        │      ● CrewAI
         Paperclip ●    │
                        │      ● AutoGen
                        ↓
                    US/Global
```

**Unser Vorteil:** Einziger Swiss-nativer Player im Open Source AI Orchestration Segment.

---

## 2. Ideal Customer Profile (ICP)

### Primäre Zielgruppe: 3 Personas

#### Persona A: "Solo-Founder Simon" (50% des Fokus)

| Attribut | Detail |
|----------|--------|
| **Wer** | Solo-Founder oder 2-Person Startup in der Schweiz |
| **Alter** | 28–42 |
| **Background** | Tech-affin, kann Terminal bedienen, hat schon AI Tools genutzt |
| **Schmerz** | "Ich hab 5 AI Tools offen aber kein System. Ich prompte mich durch den Tag." |
| **Traum** | "Ich will ein ganzes Team das für mich arbeitet — ohne jemanden einstellen zu müssen." |
| **Budget** | CHF 0–49/Monat für Tools |
| **Wo online** | LinkedIn, Twitter/X, Hacker News, Product Hunt, Reddit r/SaaS |
| **Kaufentscheidung** | Schnell (< 24h), braucht kostenlos ausprobieren |
| **Trigger-Satz** | "Dein nächster Mitarbeiter ist kein Mensch." |

#### Persona B: "Agency-Andrea" (30% des Fokus)

| Attribut | Detail |
|----------|--------|
| **Wer** | Inhaberin einer Digital-Agentur (5–20 Mitarbeiter) |
| **Alter** | 32–50 |
| **Background** | Business-fokussiert, delegiert Tech an Team |
| **Schmerz** | "Freelancer koordinieren kostet mich 40% meiner Zeit. Und jeder braucht Onboarding." |
| **Traum** | "AI Agents die wie Mitarbeiter funktionieren — mit Rollen, Budgets und Verantwortung." |
| **Budget** | CHF 149–349/Monat |
| **Wo online** | LinkedIn, Swiss Startup Events, Agentur-Netzwerke |
| **Kaufentscheidung** | 1–2 Wochen, braucht Demo + Vertrauen |
| **Trigger-Satz** | "Betreib 5 AI-Companies isoliert. Perfekt für Agencies." |

#### Persona C: "KMU-Klaus" (20% des Fokus)

| Attribut | Detail |
|----------|--------|
| **Wer** | Geschäftsführer eines Schweizer KMU (Treuhand, Immobilien, Beratung) |
| **Alter** | 40–55 |
| **Background** | Nicht tech-native, aber versteht den AI-Trend |
| **Schmerz** | "Alle reden von AI, aber ich weiss nicht wo anfangen. Und meine Daten dürfen nicht in die Cloud." |
| **Traum** | "Eine Lösung die funktioniert, lokal läuft und nDSG-konform ist." |
| **Budget** | CHF 49–149/Monat |
| **Wo online** | LinkedIn, Branchenverbände, lokale Events |
| **Kaufentscheidung** | 2–4 Wochen, braucht Vertrauen + Swiss Credentials |
| **Trigger-Satz** | "100% lokal. 100% deins. nDSG-konform." |

### TAM/SAM/SOM

| Ebene | Berechnung | Grösse |
|-------|------------|--------|
| **TAM** (Total Addressable Market) | 624k CH-KMU × 46% AI-Adoption × CHF 49/Monat avg. | ~CHF 169M/Jahr |
| **SAM** (Serviceable) | ~31k digital-affine KMU + ~1k Agencies + ~55k Neugründungen/Jahr | ~CHF 19M/Jahr |
| **SOM** (Obtainable Year 1) | 200 zahlende User × CHF 49 avg. | ~CHF 118k/Jahr |

---

## 3. Positionierung & Messaging

### Positioning Statement

> **Für** Schweizer Founders, Agencies und KMU **die** AI Agents systematisch einsetzen wollen, **ist** KaderOS **das** Betriebssystem das aus AI Tools ein echtes Team macht — **im Gegensatz zu** ChatGPT, Claude und einzelnen AI-Chats **bietet KaderOS** Rollen, Budgets, Governance und Audit Trails. **Und im Gegensatz zu** US-Alternativen wie Paperclip **ist KaderOS** Swiss Made, nDSG-konform und lokal installierbar.

### Messaging Hierarchy

| Ebene | Message | Wo einsetzen |
|-------|---------|-------------|
| **Tagline** | "Dein nächster Mitarbeiter ist kein Mensch." | Hero, Social Bios, Ads |
| **Value Prop** | "Das Betriebssystem für dein AI-Team. Lokal. Sicher. Autonom." | Landing Page Sub, Pitch |
| **Differentiator** | "Swiss Made. Nicht US-Import mit Schweizer Flagge." | Comparison, Trust |
| **Social Proof** | "{N} Gründer bauen bereits ihr AI-Team" | Waitlist Badge |
| **Urgency** | "200 Beta-Plätze. Danach Waitlist." | CTA, E-Mail |
| **Identity** | "Andere prompten. Du führst ein Unternehmen." | Problem Section, Ads |

### Messaging per Persona

| Persona | Primary Message | CTA |
|---------|----------------|-----|
| Solo-Founder Simon | "CEO, CTO, CMO — 4 Agents. 30 Sekunden. Dein Unternehmen." | "Jetzt kostenlos starten" |
| Agency-Andrea | "Betreib 5 AI-Companies isoliert. Jede mit eigenem Kader." | "Agency-Demo buchen" |
| KMU-Klaus | "Deine Daten bleiben lokal. nDSG-konform. Keine Cloud." | "Mehr erfahren" |

### Messaging für TikTok/Instagram (Aspirational Audience)

**Grundregel:** Diese Leute wollen nicht "ein Tool evaluieren". Sie wollen **ihr Leben ändern**. Das Messaging muss Traum → Beweis → Aktion sein.

| Hook-Typ | Beispiel | Psychologie |
|----------|---------|-------------|
| **Impossibility Reversal** | "Du brauchst CHF 0 und 30 Sekunden für ein ganzes Team." | Zero-Price + Spezifität |
| **Identity Challenge** | "Hör auf zu prompten. Fang an zu führen." | Identitäts-Shift |
| **Future Pacing** | "In 2 Jahren hat jeder Gründer ein AI-Team. Oder er hat keins mehr." | Verlustangst |
| **Social Proof** | "147 Gründer bauen bereits ihr AI-Team. Du noch nicht?" | FOMO |
| **Demonstration** | "Schau zu wie ich in 30 Sekunden ein Unternehmen aufbaue." | Show > Tell |
| **Relatability** | "Kein Geld für Mitarbeiter? Hatte ich auch nicht. Dann hab ich das gebaut." | Empathie + Lösung |

### LinkedIn-Timing-Strategie

> **Phase 1 (jetzt):** TikTok/Instagram für Reichweite + Waitlist. LinkedIn nur als Visitenkarte.
>
> **Phase 2 (nach Product-Market Fit):** LinkedIn einschalten — aber NUR mit Beweisen:
> - "Wir haben 50 zahlende Kunden."
> - "CHF 2'450 MRR. Monat 3."
> - "147 GitHub Stars. 0 Paid Marketing."
>
> **Warum:** LinkedIn-Profis hinterfragen alles — es sei denn du hast Zahlen. Dann schweigen sie. Erst mit PMF auf LinkedIn gehen heisst: Du diskutierst nicht ob es funktioniert. Du zeigst DASS es funktioniert.

---

## 4. Waitlist-Strategie

### Technischer Setup

| Komponente | Tool | Status |
|-----------|------|--------|
| Waitlist-Form | Landing Page (kaderos.io) | ✅ Gebaut |
| E-Mail Speicherung | Supabase (`waitlist` Tabelle) | 🔴 Noch aufsetzen |
| E-Mail Versand | Resend.com oder Loops.so | 🔴 Noch aufsetzen |
| Analytics | Plausible (privacy-first) | 🔴 Noch einbinden |

### Waitlist-Tabelle (Supabase)

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  position INTEGER NOT NULL,
  source TEXT, -- 'landing', 'linkedin', 'ph', 'referral'
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  persona TEXT, -- 'founder', 'agency', 'kmu'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Waitlist-Flow

```
1. User gibt E-Mail ein auf kaderos.io
2. Supabase INSERT → Position berechnen
3. Confirmation Screen: "Du bist #{position} auf der Waitlist"
4. Welcome E-Mail (sofort): "Du bist dabei. So gehts weiter."
5. Referral: "Teile deinen Link → rück 10 Plätze vor pro Referral"
6. Nurture Sequence: 5 E-Mails über 2 Wochen
7. Beta Invite: "Dein Platz ist frei. Starte jetzt."
```

### Waitlist Referral Mechanik

- Jeder Signup bekommt einen unique Referral-Link: `kaderos.io?ref=ABC123`
- Pro erfolgreichem Referral: +10 Plätze nach vorne
- Top-Referrer erhalten: Lifetime Pro (kostenlos)
- Leaderboard auf Landing Page (optional)

### E-Mail Nurture Sequence

| # | Timing | Betreff | Inhalt | Ziel |
|---|--------|---------|--------|------|
| 1 | Sofort | "Du bist #{position} — willkommen bei KaderOS" | Position, was KaderOS ist, Referral Link | Bestätigung + Referral |
| 2 | Tag 2 | "Warum wir KaderOS bauen" | Founder Story, Vision, Swiss AI Markt | Emotional Connection |
| 3 | Tag 5 | "Dein erstes AI-Team in 30 Sekunden" | Terminal Demo, Template Preview | Feature Excitement |
| 4 | Tag 8 | "Andere prompten. Du führst." | Identity Shift, Manifesto Quote | Identifikation |
| 5 | Tag 12 | "Beta startet bald. Dein Status: #{position}" | Urgency, Referral Reminder, "Noch X Plätze" | FOMO + Action |

---

## 5. Marketing-Kanäle

### Kanal-Strategie: Warum TikTok/Instagram statt LinkedIn

**Die Erkenntnis:** LinkedIn ist voll mit Profis die schon 10 AI Tools haben und erstmal "evaluieren". Die kaufen nicht — die hinterfragen. Unsere echten Kunden sind woanders:

- **Aspirational Founders** auf TikTok/Instagram — wollen gründen, haben kein Team, kein Budget für Mitarbeiter
- **Side-Hustler** die ihren 9-to-5 verlassen wollen — brauchen ein Team das CHF 49 kostet, nicht CHF 15k/Monat
- **Junge Gründer (22–35)** die "Build in Public" Content konsumieren und inspired werden wollen
- **KMU-Inhaber** die AI Trends auf Social Media entdecken, nicht in Fachmagazinen

> **Core Insight:** Wir verkaufen nicht ein Tool an Profis. Wir verkaufen einen Traum an Macher: "Du kannst ein Unternehmen aufbauen — mit AI als Team."

### Kanal-Priorisierung (ICE Score — revidiert)

| Kanal | Impact | Confidence | Effort | Score | Priorität |
|-------|--------|------------|--------|-------|-----------|
| **TikTok (organisch)** | 9 | 7 | 6 | 7.3 | 🥇 #1 |
| **Instagram (Reels + Stories)** | 9 | 7 | 6 | 7.3 | 🥇 #1 |
| **GitHub + README** | 8 | 9 | 8 | 8.3 | 🥇 #1 |
| **ProductHunt Launch** | 9 | 6 | 6 | 7.0 | 🥈 #2 |
| **YouTube Shorts** | 8 | 6 | 5 | 6.3 | 🥈 #2 |
| **Twitter/X** | 7 | 6 | 7 | 6.7 | 🥈 #2 |
| **Reddit (r/SaaS, r/Entrepreneur)** | 6 | 6 | 7 | 6.3 | 🥉 #3 |
| **Swiss Startup Media** | 7 | 7 | 7 | 7.0 | 🥉 #3 |
| **LinkedIn** | 6 | 7 | 7 | 6.7 | Support-Kanal (nicht primär) |
| **Swiss Events / Meetups** | 7 | 7 | 3 | 5.7 | Phase 2 |

### Kanal #1: TikTok (Primär)

**Warum:** Aspirational Founders scrollen TikTok. "Quit my 9-to-5", "Build in Public", "AI Business" — das ist unser Publikum. Avg. Engagement Rate 5.96% (höchste aller Plattformen). Algorithmus belohnt neue Creator. Keine Follower nötig für Reichweite.

**Content-Formate (30–60 Sekunden):**

| # | Format | Hook | Beispiel |
|---|--------|------|---------|
| 1 | **"Watch me build"** | Screen Recording | "Ich baue gerade ein ganzes Unternehmen. Mit AI. In 30 Sekunden." → Terminal Demo |
| 2 | **Before/After** | Split Screen | "Links: 10 Tabs, Chaos. Rechts: 1 Dashboard, 4 AI Agents." |
| 3 | **"Du brauchst kein Team"** | Face-to-Camera | "Du willst gründen aber hast kein Geld für Mitarbeiter? Dein CTO kostet CHF 0." |
| 4 | **Day-in-my-Life** | VLOG Style | "8:00 — Mein CEO-Agent hat die OKRs gesetzt. 10:00 — Mein CTO baut das Feature." |
| 5 | **Reaction/Stitch** | Trending Format | Reagiere auf "How to start a business with no money" → "Hier ist wie." |
| 6 | **Kontroverse** | Hot Take | "In 2 Jahren hat jeder Gründer ein AI-Team. Oder er hat keins mehr." |
| 7 | **Tutorial** | Screen + Voice | "So baust du dein AI-Team in 30 Sekunden. Schritt 1..." |

**Posting-Strategie:**
- **Frequenz:** 1x täglich (Minimum), 2x für schnelleres Wachstum
- **Beste Zeit:** 18:00–21:00 CET (Feierabend-Scroll)
- **Hook-Regel:** Erste 1.5 Sekunden entscheiden. Text-Overlay + Bewegung sofort.
- **Hashtags:** #AIBusiness #KaderOS #StartupSchweiz #SoloFounder #AITeam #BuildInPublic #SwissTech
- **Trending Sounds nutzen** — Algorithmus pusht Videos mit Trending Audio
- **CTA:** "Link in Bio" → Linktree/Beacons mit kaderos.io Waitlist
- **Sprache:** Deutsch mit English Sprenkeln (wie du sprichst)

**Metriken die zählen:**
- Views pro Video (Ziel: 1k+ avg. nach Woche 2)
- Profil-Visits (Ziel: 100+/Tag)
- Link-in-Bio Clicks (Ziel: 5-10% der Profil-Visits)
- Follower Growth (Ziel: +200/Woche)

### Kanal #1b: Instagram Reels + Stories

**Warum:** Gleicher Content wie TikTok, anderes Publikum. Instagram hat mehr 28–40-Jährige. Reels werden gepusht. Stories für Behind-the-Scenes.

**Playbook:**
- **Reels:** Gleiche Videos wie TikTok re-posten (ohne TikTok Watermark!)
- **Stories:** Daily "Building KaderOS" Updates — Poll-Sticker, Frage-Sticker für Engagement
- **Carousels:** "5 Gründe warum du kein Team brauchst" — Swipe-Format
- **Bio:** "Dein AI-Team. CHF 0. kaderos.io 🇨🇭" + Link
- **Highlights:** "Was ist KaderOS", "Demo", "Pricing", "Swiss Made"

**Reposting-Workflow:**
```
1. Video auf TikTok erstellen
2. Download ohne Watermark (SnapTik)
3. Auf Instagram Reels posten (leicht anderer Caption)
4. Auf YouTube Shorts posten
5. Screenshot/Clip für Twitter/X
```

### Kanal #1c: YouTube Shorts

**Warum:** Gleicher Content, dritte Plattform. YouTube Shorts werden aggressiv gepusht. Longer Shelf-Life als TikTok — Videos ranken noch Monate später.

**Zusatz zu TikTok Content:**
- Gleiche Videos, aber mit besseren Thumbnails
- Keyword-optimierte Titel ("AI Team aufbauen kostenlos")
- Links in Video-Beschreibung (funktioniert auf YouTube!)

### LinkedIn (Support-Kanal, nicht primär)

**Rolle:** Nicht für Reichweite, sondern für Credibility. Wenn jemand von TikTok kommt und "KaderOS" googelt, soll ein professionelles LinkedIn-Profil erscheinen.

- 1 Post/Woche (Building in Public, Milestones)
- Company Page mit Logo, Banner, Beschreibung
- Founder-Profil optimiert (KaderOS im Header)

### Kanal #2: GitHub

**Warum:** Open Source Credibility. Stars = Social Proof. README = Landing Page für Devs.

**Playbook:**
1. Repo public machen mit professionellem README
2. "Good First Issues" für Contributors
3. GitHub Discussions aktivieren
4. Release Notes als GitHub Releases
5. Ziel: 100 Stars in Woche 1, 500 in Monat 1

**README Struktur:**
```
# KaderOS 🇨🇭
> Dein nächster Mitarbeiter ist kein Mensch.

Swiss AI Workforce Orchestration Platform. Open Source.

[Screenshot/GIF des Dashboards]

## Quickstart
$ npx kaderos onboard --yes

## Features (mit Badges)
## Swiss Differenzierung
## Templates
## Pricing
## Contributing
```

### Kanal #3: ProductHunt

**Warum:** 1-Day Visibility Spike. Swiss Products haben Novelty-Faktor.

**Playbook (2 Wochen vor Launch):**
1. PH Account erstellen, "Upcoming" Page anlegen
2. 50 Supporter sammeln (LinkedIn, E-Mail)
3. Hunter finden (idealerweise jemand mit >1k Followers)
4. Assets vorbereiten: Logo, Screenshots, Video/GIF, Tagline
5. Launch Tag: 00:01 PST posten, alle Kanäle aktivieren

**PH Listing Copy:**
- **Tagline:** "The Operating System for Your AI Workforce 🇨🇭"
- **Description:** "KaderOS turns AI agents into a real team — with roles, budgets, governance, and Swiss data protection. Open source. Runs locally. Your data stays yours."

### Kanal #4: Swiss Startup Media

| Medium | Kontakt-Methode | Pitch-Angle |
|--------|----------------|-------------|
| **Startupticker.ch** | Pressemeldung | "Zürcher Startup lanciert Open-Source-Alternative zu US AI Tools" |
| **digitalswitzerland** | Member-Listing | "Swiss AI Innovation" |
| **Handelszeitung / NZZ** | Journalist direkt | "Schweizer KMU und AI Agents: KaderOS macht's möglich" |
| **Swisspreneur Podcast** | Bewerbung | Founder Story |
| **swiss.tech** | Pressemeldung | "Open Source AI Orchestration from Switzerland" |
| **Top 100 Swiss Startups** | Bewerbung 2027 | Swiss AI Workforce Platform |
| **Inside IT / Netzwoche** | Gastbeitrag | "Von AI Copilots zu AI Teams: Was Schweizer KMU jetzt wissen müssen" |

### Kanal #5: Swiss Communities (High-Value, Low-Volume)

| Community | Grösse | Aktion |
|-----------|--------|--------|
| **Swisspreneur Slack** | 400+ Founders | Beitreten, Value geben, KaderOS vorstellen |
| **Swiss Startups Club** (Meetup) | Events regelmässig | Pitchen bei Events |
| **CH Open** | Open Source Verein seit 1982 | Mitglied werden, Lunch-Talk geben |
| **DINAcon** | Digital Sustainability Awards | KaderOS für Award bewerben |
| **Impact Hub Zürich** | Co-Working + Community | Demo Sessions anbieten |

### Kanal #6: Swiss AI Events 2026

| Event | Datum | Aktion | Priorität |
|-------|-------|--------|-----------|
| **Zurich AI Conference** | 28. Mai 2026 | Speaker/Sponsor bewerben | 🔴 JETZT |
| **Swiss AI Summit** | 16. Nov 2026 | Grössere Launch-Plattform | Planen |
| **EY National AI Conference** | März 2026 | Verpasst — nächstes Jahr | - |
| **GenAI Zürich** | April 2026 | Gerade gelaufen — Kontakte nutzen | Follow-up |

---

## 6. Content-Strategie

### Content Pillars (3 Säulen)

| Pillar | Thema | SEO Keywords | Content-Typen |
|--------|-------|-------------|---------------|
| **1. AI Teams** | Warum AI Agents > AI Tools | "AI Agent Orchestration", "AI Team aufbauen" | Blog, LinkedIn, Video |
| **2. Swiss AI** | Schweizer AI-Landschaft, nDSG, Datenschutz | "AI Schweiz", "nDSG AI", "Swiss AI Tools" | Blog, Gastbeiträge, PR |
| **3. Building in Public** | KaderOS Entwicklung, Learnings, Metrics | "Open Source SaaS", "KaderOS" | LinkedIn, Twitter, GitHub |

### Blog-Plan (erste 8 Artikel)

| # | Titel | Pillar | Keyword | Buyer Stage |
|---|-------|--------|---------|-------------|
| 1 | "Warum wir KaderOS bauen" | 3 | "kaderos" | Awareness |
| 2 | "AI Agents in der Schweiz: Von Copilots zu Kader" | 2 | "AI Agents Schweiz" | Awareness |
| 3 | "KaderOS vs Paperclip: Was ist der Unterschied?" | 1 | "Paperclip Alternative" | Consideration |
| 4 | "nDSG und AI: Was du wissen musst" | 2 | "nDSG AI Compliance" | Awareness |
| 5 | "Als Solo-Founder ein AI-Team aufbauen — Schritt für Schritt" | 1 | "AI Team Solo Founder" | Consideration |
| 6 | "Confidence Gate erklärt: Wann dein Agent autonom handelt" | 1 | "AI Agent Governance" | Consideration |
| 7 | "Swiss Cloud vs US Cloud: Wo deine AI-Daten hingehören" | 2 | "Swiss Cloud AI" | Awareness |
| 8 | "Von 0 auf 200 Waitlist-Signups: Unser GTM Playbook" | 3 | "SaaS Waitlist Strategy" | Awareness |

### SEO Quick Wins

| Keyword | Volume (DE) | Difficulty | KaderOS-Relevanz |
|---------|-------------|------------|-----------------|
| "AI Agent" | 8.1k | Medium | Hoch — Core Concept |
| "AI Orchestration" | 1.2k | Low | Sehr Hoch — Exact Match |
| "AI Team aufbauen" | 480 | Low | Sehr Hoch — ICP Intent |
| "KI Unternehmen gründen" | 390 | Low | Hoch — Aspirational |
| "nDSG AI" | 210 | Very Low | Sehr Hoch — Swiss Niche |
| "Paperclip Alternative" | 90 | Very Low | Sehr Hoch — Competitor |

---

## 7. Launch-Sequenz

### Pre-Launch (Tag 1–14)

```
TAG 1:  kaderos.io live deployen
        GitHub Repo public
        LinkedIn Post #1: "Wir bauen KaderOS"

TAG 2:  Waitlist-Backend (Supabase) live
        E-Mail Sequence aufsetzen (Resend/Loops)

TAG 3:  LinkedIn Post #2: Building in Public (Screenshot Dashboard)
        Blog #1 publishen: "Warum wir KaderOS bauen"

TAG 5:  LinkedIn Post #3: Hot Take ("Andere prompten...")
        Blog #2: "AI Agents in der Schweiz"

TAG 7:  LinkedIn Post #4: Manifesto Quote (Screenshot-worthy)
        Startupticker Pressemeldung senden

TAG 10: LinkedIn Post #5: Feature Deep Dive (Meeting Room)
        Blog #3: "KaderOS vs Paperclip"
        ProductHunt "Upcoming" Page anlegen

TAG 12: LinkedIn Post #6: Waitlist Update ("Schon X Signups!")
        Hacker News "Show HN" vorbereiten

TAG 14: LinkedIn Post #7: "Beta startet nächste Woche"
        Alle PR-Kontakte pitchen
```

### Launch Day (Tag 15)

```
00:01 PST  ProductHunt Live
06:00 CET  LinkedIn Post: "Wir sind live auf ProductHunt 🚀"
07:00 CET  Hacker News: "Show HN: KaderOS — Swiss AI Workforce OS"
08:00 CET  Twitter/X Thread
09:00 CET  E-Mail an Waitlist: "KaderOS ist live!"
10:00 CET  Reddit Posts (r/SaaS, r/artificial, r/opensource)
12:00 CET  LinkedIn Update: "Wir sind #X auf ProductHunt!"
18:00 CET  Thank-you Post auf allen Kanälen
```

### Post-Launch (Tag 16–30)

```
WOCHE 3:  Blog #4 + #5 publishen
          LinkedIn 3x/Woche weiter
          Erste Beta-User onboarden
          Feedback sammeln

WOCHE 4:  Blog #6 + #7 publishen
          Swiss Startup Media Follow-ups
          Discord Community eröffnen
          Erste Case Study vorbereiten

WOCHE 5:  Blog #8 publishen
          "Building in Public" Metrics teilen
          Referral-Programm aktivieren

WOCHE 6:  Erste 50 Beta-User Ziel
          Feedback → Feature Prioritization
          Stripe Integration (CHF Payments)
```

---

## 8. Metriken & KPIs

### Wöchentliches Scorecard

| Metrik | Ziel Woche 1 | Ziel Woche 2 | Ziel Woche 4 | Ziel Woche 8 |
|--------|-------------|-------------|-------------|-------------|
| Waitlist Signups (total) | 30 | 80 | 200 | 500 |
| Website Visitors/Woche | 200 | 500 | 1'000 | 2'500 |
| GitHub Stars | 20 | 50 | 200 | 500 |
| LinkedIn Followers | +50 | +100 | +250 | +500 |
| LinkedIn Post Impressions | 2k | 5k | 15k | 30k |
| Blog Visits/Woche | 50 | 150 | 500 | 1'000 |
| Beta Users (aktiv) | 0 | 0 | 10 | 50 |
| MRR (CHF) | 0 | 0 | 0 | 490 |

### Conversion Funnel

```
Visitor → Waitlist Signup:     Target 8–12%
Waitlist → Beta Invite Accept: Target 60%
Beta → Active User (7d):       Target 40%
Active → Paid:                 Target 15%
```

### North Star Metric

> **Aktive Kader pro Woche** — Wie viele User haben in den letzten 7 Tagen mindestens 1 Agent aktiv genutzt?

---

## 9. Budget

### Phase 0–1: CHF 0 (Organic Only)

| Posten | Kosten | Notiz |
|--------|--------|-------|
| kaderos.io Domain | CHF 56/Jahr | ✅ Bezahlt |
| Vercel (Hosting) | CHF 0 | Free Tier reicht |
| Supabase | CHF 0 | Free Tier für Waitlist |
| Resend (E-Mail) | CHF 0 | 3k Mails/Monat free |
| Plausible Analytics | CHF 9/Monat | Privacy-first |
| **Total Monat 1** | **CHF ~9** | |

### Phase 2: CHF 200–500/Monat (ab Woche 4)

| Posten | Kosten | Notiz |
|--------|--------|-------|
| LinkedIn Ads (Test) | CHF 200/Monat | Persona A targeting |
| Supabase Pro | CHF 25/Monat | Wenn Waitlist >10k rows |
| Vercel Pro | CHF 20/Monat | Wenn Traffic steigt |
| Tools (Canva, etc.) | CHF 50/Monat | Content Creation |
| **Total Monat 2–3** | **CHF ~300** | |

### Phase 3: Revenue-Funded

Ab 10 zahlenden Usern (CHF 490 MRR) → Marketing-Budget aus Revenue.

---

## 10. Woche-für-Woche Playbook

### Woche 0 (heute)

- [ ] kaderos.io auf Vercel deployen
- [ ] Supabase `waitlist` Tabelle erstellen
- [ ] Waitlist-Form mit Supabase verbinden
- [ ] Plausible Analytics einbinden
- [ ] GitHub Repo public machen + README
- [ ] LinkedIn Post #1 schreiben + posten
- [ ] E-Mail-Tool aufsetzen (Resend)
- [ ] Welcome E-Mail Template erstellen

### Woche 1

- [ ] TikTok Account erstellen (@kaderos.io)
- [ ] Instagram Account erstellen (@kaderos.io)
- [ ] Erstes TikTok: Script 1 "Watch Me Build" — Screen Recording
- [ ] Täglich 1 TikTok/Reel posten (7 Videos)
- [ ] Blog #1 publishen: "Warum wir KaderOS bauen"
- [ ] GitHub: Good First Issues erstellen
- [ ] Waitlist Referral-Mechanik implementieren
- [ ] E-Mail Nurture Sequence (5 Mails) aufsetzen
- [ ] Swisspreneur Slack beitreten
- [ ] **Ziel: 30 Waitlist Signups, 1k TikTok Views total**

### Woche 2

- [ ] Täglich 1 TikTok/Reel (7 weitere Videos)
- [ ] Script 2 "Du brauchst kein Team" posten
- [ ] Script 4 "Day in My Life" posten
- [ ] Blog #2 + #3 publishen
- [ ] ProductHunt Upcoming Page anlegen
- [ ] Startupticker Pressemeldung senden
- [ ] YouTube Shorts starten (Re-post von TikToks)
- [ ] LinkedIn Company Page aufsetzen (nur Basis)
- [ ] **Ziel: 80 Waitlist Signups, 5k TikTok Views total**

### Woche 3 (Launch Week)

- [ ] ProductHunt Launch vorbereiten (Assets, Copy, Hunter)
- [ ] **LAUNCH DAY** (siehe Launch-Sequenz oben)
- [ ] TikTok: "Wir sind live auf ProductHunt" Video
- [ ] Instagram Story Countdown zum Launch
- [ ] Reddit Posts in r/SaaS, r/Entrepreneur, r/artificial
- [ ] Blog #4 publishen
- [ ] Hacker News "Show HN" Post
- [ ] **Ziel: 200 Waitlist Signups, 20k TikTok Views total**

### Woche 4

- [ ] Erste 10 Beta-User einladen (Top Waitlist)
- [ ] Blog #5 publishen: "Solo-Founder AI-Team aufbauen"
- [ ] LinkedIn: 3x/Woche weiter
- [ ] Feedback von Beta-Usern sammeln
- [ ] Discord Community eröffnen
- [ ] Swiss Startup Media Follow-ups

### Woche 5–6

- [ ] Blog #6 + #7 publishen
- [ ] Beta auf 50 User erweitern
- [ ] Erste Case Study erstellen
- [ ] Building in Public: Metrics teilen
- [ ] Referral-Programm aktivieren
- [ ] Stripe Integration (CHF Payments) live

### Woche 7–8

- [ ] Blog #8 publishen
- [ ] Stripe live → erste zahlende User
- [ ] LinkedIn: Paid Ads Test (CHF 200)
- [ ] Swiss Meetup/Event besuchen
- [ ] **Ziel: 50 Beta-User, 10 Paid, CHF 490 MRR**

---

## Appendix

### A. TikTok/Reels Script Templates

**Script 1: "Watch Me Build" (Screen Recording, 30s)**
```
HOOK (0-2s):  Text-Overlay: "Ich baue ein Unternehmen. In 30 Sekunden."
              [Screen Recording startet]

DEMO (2-20s): Terminal: npx kaderos onboard --yes
              → 4 Agents erscheinen
              → Dashboard öffnet sich
              → Meeting Room: "Hey Max, was ist der Status?"

PAYOFF (20-28s): Text: "CEO. CTO. CMO. Strategy. CHF 0."
                 Voice: "Mein ganzes Team. Auf meinem Laptop."

CTA (28-30s): "Link in Bio. kaderos.io 🇨🇭"

Hashtags: #AIBusiness #KaderOS #SoloFounder #StartupSchweiz
         #BuildInPublic #AITeam #Entrepreneurship
```

**Script 2: "Du brauchst kein Team" (Face-to-Camera, 45s)**
```
HOOK (0-3s):  "Du willst gründen aber hast kein Geld für Mitarbeiter?"
              [Pause, Blick in Kamera]

PROBLEM (3-12s): "Ich war genau da. Alleine. 5 AI Tools offen.
                  Keiner wusste vom anderen. Kein Plan. Kein Budget."

LÖSUNG (12-30s): "Dann hab ich KaderOS gebaut."
                  [Screen zeigt Dashboard]
                  "4 AI Agents. CEO, CTO, CMO, Strategy."
                  "Jeder hat eine Rolle. Ein Budget in Franken."
                  "Und einen Audit Trail — damit ich weiss wer was macht."

TRANSFORMATION (30-40s): "Das ist kein Tool. Das ist mein Team."
                         "Und es kostet weniger als ein Kaffee pro Tag."

CTA (40-45s): "kaderos.io — Link in Bio. Kostenlos."
```

**Script 3: "Kontroverse" (Hot Take, 15s)**
```
HOOK (0-2s):  Text: "Unpopular Opinion:"

TAKE (2-10s): "In 2 Jahren hat jeder Gründer ein AI-Team.
               Oder er hat kein Unternehmen mehr."

PROOF (10-13s): "46% der Schweizer Firmen nutzen bereits AI.
                 Die anderen 54% schauen zu."

CTA (13-15s): "Bist du Team 46%? kaderos.io"
```

**Script 4: "Day in My Life with AI Team" (VLOG, 60s)**
```
08:00 — "Guten Morgen. Mein CEO-Agent Vega hat über Nacht
         die OKRs für Q2 priorisiert."
         [Screen: Goals View]

09:00 — "Mein CTO Max arbeitet am Voice Feature.
         Budget: CHF 50 diesen Monat. Er ist bei 60%."
         [Screen: Agent Card + Budget]

11:00 — "Quick Standup im Meeting Room."
         [Screen: Chat mit Agents]
         "Max, Status?" → Antwort kommt

14:00 — "Aura hat einen Outreach-Draft erstellt.
         Confidence: 85%. Ich genehmige."
         [Screen: Decision Log → Approve]

17:00 — "Mein Team hat heute mehr geschafft als ich alleine in einer Woche.
         Und es hat mich CHF 1.60 gekostet."
         [Zeigt Budget-View]

CTA:    "kaderos.io — dein AI-Team. Link in Bio."
```

**Script 5: "Before/After" (Split Screen, 20s)**
```
LEFT SIDE:  "Vorher"
            — 10 Browser Tabs
            — CHF 0 Budget-Kontrolle
            — "Wer hat das entschieden??"
            — Chaos

RIGHT SIDE: "Nachher — KaderOS"
            — 1 Dashboard
            — CHF pro Agent
            — Audit Trail
            — Kontrolle

Text: "Gleiches Business. Anderes System."
CTA:  "kaderos.io 🇨🇭"
```

### A2. LinkedIn Posts (Support-Kanal, 1x/Woche)

**Nur Milestones und Beweise posten:**
```
KaderOS Update:

✅ [X] Waitlist Signups
✅ [X] GitHub Stars
✅ [X] Beta User aktiv
📊 [X] CHF MRR

Nicht reden. Machen.

→ kaderos.io
```

### B. E-Mail Templates

**Welcome E-Mail:**
```
Betreff: Du bist #{position} — willkommen bei KaderOS 🇨🇭

Hey {name},

du bist #{position} auf der KaderOS Waitlist.

KaderOS ist das Betriebssystem, mit dem du ein ganzes Unternehmen
aus AI Agents aufbaust. CEO, CTO, CMO — dein Kader arbeitet. Du führst.

Was dich erwartet:
→ Open Source, lokal installierbar
→ CHF-Budgets pro Agent
→ nDSG-konform ab Tag 1

Schneller dran? Teile deinen Link:
[REFERRAL_LINK]

Pro Referral rückst du 10 Plätze vor.

Bis bald,
Thesh
Founder, KaderOS
```

### C. Pressemeldung Template

```
PRESSEMELDUNG

Zürcher Startup lanciert Open-Source-Alternative für AI-Team-Orchestrierung

Zürich, [Datum] — KaderOS, eine Open-Source-Plattform zur Orchestrierung
von AI Agents, startet die öffentliche Beta. Die Software ermöglicht es
Schweizer KMU, Agencies und Gründern, AI Agents wie ein echtes Team zu
organisieren — mit Rollen, Budgets und Governance.

"46% der Schweizer Firmen nutzen AI, aber fast niemand orchestriert
mehrere Agents systematisch", sagt Thesh Sritharan, Gründer von KaderOS.
"Wir ändern das — mit einem Tool das nDSG-konform ist, lokal läuft und
in CHF budgetiert."

KaderOS ist unter kaderos.io verfügbar und auf GitHub als Open Source
(AGPLv3) veröffentlicht.

Kontakt: press@kaderos.io
Website: kaderos.io
GitHub: github.com/kaderos
```

---

*Dieses Dokument wird wöchentlich aktualisiert basierend auf Metriken und Learnings.*

---

## Appendix D: Swiss Market Intel (Research Brief)

### Key Takeaways

1. **Markt ist real:** 624k KMU, ~31k digital-affin. CHF 10–100k Digitalisierungsbudget pro KMU. AI CAGR 18.5%.
2. **LinkedIn ist DER Kanal:** 5.3 Mio. User, 58% Penetration, Carousels 6.6% Engagement. Kein anderer Kanal hat diese B2B-Reichweite in der Schweiz.
3. **Community-Led möglich:** Swisspreneur (400 Founders), CH Open, Swiss Startups Club — kleine aber hochkonzentrierte Communities.
4. **Event-Pipeline nutzen:** Zurich AI Conference (28. Mai) + Swiss AI Summit (16. Nov) als Checkpoints.
5. **"Swiss Made" ist ein Asset:** Proton hat damit eine globale Marke aufgebaut. KaderOS kann das im AI-Segment replizieren.

### Sofort-Actions aus Research

| Action | Deadline | Owner |
|--------|----------|-------|
| Zurich AI Conference (28. Mai) — Speaker bewerben | Diese Woche | Thesh |
| Swisspreneur Slack beitreten | Heute | Thesh |
| CH Open Mitgliedschaft prüfen | Diese Woche | Thesh |
| DINAcon Award Bewerbung recherchieren | Woche 2 | Thesh |
| Top 100 Swiss Startups 2027 Bewerbung vormerken | Q3 2026 | Thesh |
