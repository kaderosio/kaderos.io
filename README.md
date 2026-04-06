<div align="center">

```
 _  __          _            ___  ____  
| |/ /__ _  ___| | ___ _ __ / _ \/ ___| 
| ' // _` |/ __| |/ _ \ '__| | | \___ \ 
| . \ (_| | (__|   __/ |  | |_| |___) |
|_|\_\__,_|\___|_|\___|_|   \___/|____/ 
```

**The open-source AI workforce OS with 7-layer memory.**

[![GitHub Stars](https://img.shields.io/github/stars/kaderosio/kaderos.io?style=social)](https://github.com/kaderosio/kaderos.io)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPLv3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Website](https://img.shields.io/badge/Website-kaderos.io-red)](https://kaderos.io)
[![Swiss Made](https://img.shields.io/badge/Swiss_Made-🇨🇭-red)](https://kaderos.io)

[Website](https://kaderos.io) · [Documentation](https://kaderos.io/docs) · [Blog](https://kaderos.io/landing/blog)

</div>

---

![Dashboard](docs/dashboard.png)

## Why KaderOS?

You have 5 AI tools open. None of them know about each other. No shared memory, no budget control, no audit trail. **KaderOS turns isolated AI tools into a managed workforce** — with org structure, persistent memory, and Swiss-grade compliance. Think "ERP for AI agents."

## Key Features

- 🧠 **7-Layer Agent Memory** — structured recall without LLM hallucination (rule-based, no vector-only search)
- 👥 **AI Team with Roles & Governance** — org chart, reporting lines, confidence gates, escalation paths
- ⚡ **Heartbeat Engine** — agents auto-execute daily tasks, report back, surface blockers
- 💰 **CHF Billing** — per-agent budgets in Swiss Francs, auto-stop at limits, no surprise invoices
- 🔒 **nDSG Compliant** — AES-256 encryption, full audit trail, data residency options
- 📊 **Decision Framework** — confidence thresholds (>90% autonomous, <70% human review)
- 🔌 **Connectors** — Claude, GPT, GitHub, Slack, Notion, and growing
- 🇨🇭 **Swiss Made, Open Source** — AGPLv3 licensed, built in Zürich

## Quick Start

```bash
git clone https://github.com/kaderosio/kaderos.io.git
cd kaderos.io
pnpm install
cp .env.example .env.local   # add your Supabase + API keys
pnpm dev
```

> Open [http://localhost:3000](http://localhost:3000) — your AI workforce dashboard is ready.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   KaderOS Platform                   │
├─────────────┬─────────────┬─────────────────────────┤
│  Dashboard  │  Meeting    │  Org Chart              │
│  (Next.js)  │  Room       │  & Budget View          │
├─────────────┴─────────────┴─────────────────────────┤
│                    tRPC API Layer                     │
├──────────┬──────────┬──────────┬────────────────────┤
│ Heartbeat│ Decision │ Budget   │ Agent              │
│ Engine   │ Engine   │ Manager  │ Communication      │
├──────────┴──────────┴──────────┴────────────────────┤
│              7-Layer Memory System                    │
├─────────────────────────────────────────────────────┤
│         PostgreSQL (Supabase) + AES-256              │
└─────────────────────────────────────────────────────┘
```

## The 7 Memory Layers

| Layer | Name | Purpose | Persistence |
|-------|------|---------|-------------|
| 1 | **Instant** | Current conversation context | Session |
| 2 | **Working** | Active task state & variables | Task lifetime |
| 3 | **Episodic** | Past interactions & outcomes | Permanent |
| 4 | **Semantic** | Domain knowledge & facts | Permanent |
| 5 | **Procedural** | Learned workflows & SOPs | Permanent |
| 6 | **Strategic** | Company goals & OKRs | Quarterly |
| 7 | **Identity** | Agent role, personality, constraints | Permanent |

> No vector-only retrieval. Each layer has deterministic rules for what gets stored, recalled, and forgotten.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind v4 |
| Backend | tRPC, Drizzle ORM |
| Database | PostgreSQL (Supabase) |
| Auth | Supabase Auth |
| Hosting | Vercel |
| Monorepo | Turborepo + pnpm |
| Encryption | AES-256 (at rest + in transit) |
| Language | TypeScript (end-to-end) |

## How KaderOS Compares

| Feature | KaderOS | CrewAI | AutoGen | n8n |
|---------|---------|--------|---------|-----|
| Agent memory (7 layers) | ✅ | ❌ (short-term only) | ❌ (conversation only) | ❌ |
| Org chart & hierarchy | ✅ | Partial | ❌ | ❌ |
| Budget management (CHF) | ✅ | ❌ | ❌ | ❌ |
| Heartbeat (auto-execute) | ✅ | ❌ | ❌ | ✅ (cron) |
| Confidence gates | ✅ | ❌ | ❌ | ❌ |
| Full audit trail | ✅ | ❌ | ❌ | Partial |
| Swiss data compliance | ✅ | ❌ | ❌ | Self-host |
| Open source | ✅ AGPLv3 | ✅ MIT | ✅ MIT | ✅ Sustainable Use |
| No-code setup | ✅ | ❌ (Python) | ❌ (Python) | ✅ |

> CrewAI and AutoGen are excellent for developers building agent pipelines. KaderOS is for **business operators** who want to manage AI like they manage people — with roles, budgets, and accountability.

## Project Structure

```
KaderOS/
├── apps/
│   ├── web/               # Next.js Dashboard + Landing
│   └── video/             # Remotion Video Templates
├── packages/
│   ├── db/                # Drizzle Schema
│   ├── core/              # Business Logic + Engines
│   └── ui/                # Shared Components
├── docs/                  # Architecture Docs
└── templates/             # Swiss Kader Templates
```

## Contributing

We welcome contributions. Here's how to get started:

1. Fork the repo and create a branch (`git checkout -b feature/my-feature`)
2. Make your changes with tests where applicable
3. Run `pnpm lint && pnpm typecheck` before committing
4. Open a PR with a clear description of what and why

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

**Areas we need help with:**
- Agent connector plugins (Slack, Notion, Linear)
- Memory layer optimizations
- i18n (DE, FR, IT translations)
- Documentation and examples

## Star History

<a href="https://star-history.com/#kaderosio/kaderos.io&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=kaderosio/kaderos.io&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=kaderosio/kaderos.io&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=kaderosio/kaderos.io&type=Date" />
 </picture>
</a>

## License

KaderOS is licensed under [AGPLv3](LICENSE).

You can use it freely for any purpose. If you modify and distribute it (or run it as a service), you must share your changes under the same license. Commercial licensing available — [contact us](mailto:hello@kaderos.io).

---

<div align="center">

**Others prompt. You run a company.**

[Get Started](https://kaderos.io) · [Star this repo ⭐](https://github.com/kaderosio/kaderos.io)

</div>
