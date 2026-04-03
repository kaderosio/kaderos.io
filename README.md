<div align="center">
  <img src="https://img.shields.io/badge/Swiss_Made-🇨🇭-red" alt="Swiss Made" />
  <img src="https://img.shields.io/badge/License-AGPLv3-blue" alt="License" />
  <img src="https://img.shields.io/badge/Status-Beta-orange" alt="Status" />
</div>

<h1 align="center">
  <br />
  <img src="apps/web/public/favicon.ico" alt="KaderOS" width="60" />
  <br />
  KaderOS
  <br />
</h1>

<h3 align="center">Dein nächster Mitarbeiter ist kein Mensch.</h3>

<p align="center">
  Swiss AI Workforce Orchestration Platform.<br />
  Stell ein Team aus AI Agents auf. Gib die Richtung vor. Skaliere ohne Headcount.
</p>

<p align="center">
  <a href="https://kaderos.io"><strong>kaderos.io</strong></a> ·
  <a href="https://kaderos.io/landing#features">Features</a> ·
  <a href="https://kaderos.io/landing#pricing">Pricing</a> ·
  <a href="https://kaderos.io/landing/blog">Blog</a>
</p>

---

## Was ist KaderOS?

KaderOS macht aus deinen AI Tools ein Team — mit Rollen, Zielen und CHF-Budgets.

Du hast 5 AI Tools offen. Keiner weiss vom anderen. Kein Budget. Kein Audit.
KaderOS gibt dir ein Dashboard, ein Organigramm und volle Kontrolle.

```bash
npx kaderos onboard
# ✓ 4 Agents bereit (CEO · CTO · CMO · Strategy)
# ✓ Budget gesetzt: CHF 62/Monat
# 🚀 Dein AI-Kader ist einsatzbereit.
```

## Features

| Feature | Was es macht |
|---------|-------------|
| **Org Chart** | Wer reportet an wen. Rollen, Verantwortung, Hierarchie. |
| **Meeting Room** | Sprich mit deinen Agents wie in einem echten Standup. |
| **Budget in CHF** | Pro Agent. Auto-Stopp bei Limit. Keine Überraschungen. |
| **Confidence Gate** | Über 90%? Agent handelt. Unter 70%? Du entscheidest. |
| **Audit Trail** | Jede Entscheidung protokolliert. nDSG-konform ab Tag 1. |
| **Connectors** | Claude, GPT, GitHub, Slack, Notion — dein Stack, verbunden. |
| **Sprints** | Montag planen, Freitag reviewen. Dazwischen arbeitet dein Kader. |
| **Multi-Company** | 5 Firmen isoliert betreiben. Jede mit eigenem Kader. |

## Tech Stack

| Layer | Technologie |
|-------|-------------|
| Frontend | Next.js 15, React 19, Tailwind v4 |
| Backend | tRPC, Drizzle ORM |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth |
| Hosting | Vercel |
| Monorepo | Turborepo + pnpm |

## Projekt-Struktur

```
KaderOS/
├── apps/
│   ├── web/               # Next.js Dashboard + Landing Page
│   │   ├── app/landing/   # Marketing Site (9 Pages)
│   │   ├── app/api/       # Waitlist API
│   │   └── utils/         # Supabase Helpers
│   └── video/             # Remotion Video Templates
├── packages/
│   ├── db/                # Drizzle Schema (12 Tabellen)
│   ├── core/              # Business Logic
│   └── ui/                # Shared Components
├── docs/                  # GTM Plan, Video Scripts
└── templates/             # Swiss Kader Templates
```

## Quickstart

```bash
# Clone
git clone https://github.com/kaderosio/kaderos.io.git
cd kaderos.io

# Install
pnpm install

# Dev Server
cd apps/web && pnpm dev
```

> [!NOTE]
> KaderOS ist in aktiver Entwicklung. Die Landing Page und Waitlist sind live. Dashboard und Agent-Features kommen in den nächsten Wochen.

## Pricing

| Tier | CHF/Monat | Agents |
|------|-----------|--------|
| Community | 0 | 3 |
| Pro | 49 | 10 |
| Team | 149 | 25 |
| Agency | 349 | Unlimited |

## Waitlist

Wir haben eine limitierte Beta. Sicher dir deinen Platz:

**[→ kaderos.io](https://kaderos.io)**

## Swiss Made

- 🇨🇭 Entwickelt in Zürich
- nDSG-konform ab Tag 1
- CHF-native Budgets
- 100% lokale Datenhaltung möglich
- Mehrsprachig: DE / FR / IT / EN

## Lizenz

[AGPLv3](LICENSE) — Open Source mit Commercial Option.

---

<p align="center">
  <strong>Andere prompten. Du führst ein Unternehmen.</strong>
</p>
