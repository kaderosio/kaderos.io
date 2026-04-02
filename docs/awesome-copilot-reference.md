# Awesome Copilot — Vollständige Referenz

> Quelle: `/Users/thesh/Documents/Thesh AI/Thesh AI/awesome-copilot-main/`
> Atlas MUSS diese Ressourcen bei jeder passenden Gelegenheit nutzen.

---

## Wie nutzen?

Jede Ressource liegt als `.md` File im awesome-copilot-main Ordner. Atlas liest sie on-demand wenn ein Task zu einer Kategorie passt.

- **Skills** → `skills/<name>/SKILL.md` — Detaillierte Workflows mit Steps
- **Agents** → `agents/<name>.agent.md` — Vordefinierte Agent-Persönlichkeiten
- **Instructions** → `instructions/<name>.instructions.md` — Coding Standards
- **Hooks** → `hooks/<name>/` — Automatische Checks
- **Plugins** → `plugins/<name>/` — Gebündelte Pakete (Skills + Agents + Instructions)
- **Workflows** → `workflows/<name>.md` — Automatisierte Reports

**Basispfad:** `/Users/thesh/Documents/Thesh AI/Thesh AI/awesome-copilot-main/`

---

## Skills (257 total)

### AI & LLM & MCP (28)
| Skill | Beschreibung |
|-------|-------------|
| `agent-governance` | Governance, Safety, Trust Controls für AI Agent Systems |
| `agentic-eval` | Evaluating + Improving AI Agent Outputs |
| `ai-prompt-engineering-safety-review` | Prompt Safety, Bias, Security Review |
| `create-agentsmd` | AGENTS.md für Repo generieren |
| `copilot-sdk` | Agentic Apps mit GitHub Copilot SDK bauen |
| `create-llms` | llms.txt erstellen (LLM-optimierte Repo-Beschreibung) |
| `declarative-agents` | Microsoft 365 Copilot Declarative Agents |
| `eval-driven-dev` | Eval-Driven Development |
| `finalize-agent-prompt` | Agent Prompts polieren |
| `make-skill-template` | Neue Agent Skills erstellen |
| `memory-merger` | Lessons aus Memory in Instructions mergen |
| `model-recommendation` | Optimales AI Model für Task empfehlen |
| `nano-banana-pro-openrouter` | Image Generation via OpenRouter |
| `remember` | Domain-organized Memory Instructions |
| `remember-interactive-programming` | Interactive Programming Reminder |
| `semantic-kernel` | Microsoft Semantic Kernel Solutions |
| `structured-autonomy-generate` | Structured Autonomy Implementation |
| `structured-autonomy-implement` | Structured Autonomy Implementation |
| `structured-autonomy-plan` | Structured Autonomy Planning |
| `suggest-awesome-github-copilot-agents` | Relevante Agents vorschlagen |
| `suggest-awesome-github-copilot-instructions` | Relevante Instructions vorschlagen |
| `suggest-awesome-github-copilot-skills` | Relevante Skills vorschlagen |
| `what-context-needed` | Welche Files braucht der Agent? |
| `mcp-cli` | MCP Server Interface via CLI |
| `mcp-create-adaptive-cards` | Adaptive Cards via MCP |
| `mcp-create-declarative-agent` | Declarative Agent via MCP |
| `mcp-deploy-manage-agents` | Deploy + Manage Agents via MCP |
| `microsoft-agent-framework` | Microsoft Agent Framework Solutions |

### Architecture & Planning (18)
| Skill | Beschreibung |
|-------|-------------|
| `architecture-blueprint-generator` | Codebase analysieren → Architecture Docs generieren |
| `breakdown-epic-arch` | Epic → Technical Architecture |
| `breakdown-epic-pm` | Epic → Product Requirements Document |
| `breakdown-feature-implementation` | Feature → Implementation Plan |
| `breakdown-feature-prd` | Feature → PRD |
| `breakdown-plan` | Epic > Feature > Story Hierarchy + Dependencies |
| `breakdown-test` | Test Strategy + Task Breakdown |
| `create-architectural-decision-record` | ADR erstellen |
| `create-implementation-plan` | Implementation Plan für Features/Refactoring |
| `create-specification` | Spec File für GenAI Consumption |
| `create-technical-spike` | Time-boxed Technical Spike Docs |
| `folder-structure-blueprint-generator` | Projekt-Struktur dokumentieren |
| `plantuml-ascii` | ASCII Diagramme mit PlantUML |
| `refactor-plan` | Multi-File Refactor planen |
| `structured-autonomy-plan` | Structured Autonomy Planning |
| `technology-stack-blueprint-generator` | Tech Stack Blueprint generieren |
| `update-implementation-plan` | Bestehenden Plan updaten |
| `update-specification` | Bestehende Spec updaten |

### GTM & Growth & Marketing (6)
| Skill | Beschreibung |
|-------|-------------|
| `gtm-0-to-1-launch` | Product Launch: Idea → First Customers |
| `gtm-ai-gtm` | GTM Strategy für AI Products |
| `gtm-board-and-investor-communication` | Board Decks, Investor Updates |
| `gtm-enterprise-onboarding` | Enterprise Customer Onboarding (4 Phases) |
| `gtm-partnership-architecture` | Partner Ecosystem aufbauen |
| `gtm-positioning-strategy` | Market Position finden + verteidigen |
| `gtm-product-led-growth` | PLG: Self-Serve Acquisition + Expansion |
| `gtm-technical-product-pricing` | Pricing Strategy für Tech Products |
| `gtm-developer-ecosystem` | Developer-Led Adoption |
| `gtm-operating-cadence` | Meeting Rhythms, Metric Reporting, QBR |

### Frontend & UI
| Skill | Beschreibung |
|-------|-------------|
| `premium-frontend-ui` | High-Performance Web Experiences, Motion, Typography |
| `web-coder` | Expert 10x Web Dev (HTML, CSS, JS, Frameworks) |
| `web-design-reviewer` | Visual Inspection für Design Issues |
| `penpot-uiux-design` | UI/UX Design in Penpot |
| `game-engine` | Web-Based Game Engines (Canvas, WebGL) |
| `next-intl-add-language` | Next.js + next-intl Language hinzufügen |
| `chrome-devtools` | Browser Automation, Debugging, Performance |
| `fluentui-blazor` | FluentUI Blazor Components |

### Backend & API
| Skill | Beschreibung |
|-------|-------------|
| `openapi-to-application-code` | OpenAPI Spec → Production App |
| `typescript-mcp-server-generator` | TypeScript MCP Server generieren |
| `python-mcp-server-generator` | Python MCP Server generieren |
| `go-mcp-server-generator` | Go MCP Server generieren |
| `java-mcp-server-generator` | Java MCP Server generieren |
| `rust-mcp-server-generator` | Rust MCP Server generieren |
| `ruby-mcp-server-generator` | Ruby MCP Server generieren |
| `swift-mcp-server-generator` | Swift MCP Server generieren |
| `php-mcp-server-generator` | PHP MCP Server generieren |
| `csharp-mcp-server-generator` | C# MCP Server generieren |
| `kotlin-mcp-server-generator` | Kotlin MCP Server generieren |
| `transloadit-media-processing` | Video/Audio/Image Processing |
| `sandbox-npm-install` | npm Install in Docker Sandbox |

### Testing & QA (25)
| Skill | Beschreibung |
|-------|-------------|
| `playwright-generate-test` | Playwright Tests generieren |
| `playwright-explore-website` | Website Exploration für Testing |
| `playwright-automation-fill-in-form` | Form Automation mit Playwright |
| `webapp-testing` | Local Web App Testing mit Playwright |
| `polyglot-test-agent` | Unit Tests für jede Sprache (Multi-Agent Pipeline) |
| `quality-playbook` | 6 Quality Artifacts generieren |
| `pytest-coverage` | pytest + Coverage auf 100% |
| `javascript-typescript-jest` | Jest Best Practices |
| `breakdown-test` | Test Strategy + Task Breakdown |
| `scoutqa-test` | ScoutQA Testing |
| `unit-test-vue-pinia` | Vue 3 + Vitest + Pinia Tests |
| `spring-boot-testing` | Spring Boot 4 Testing |

### Security (5)
| Skill | Beschreibung |
|-------|-------------|
| `security-review` | AI-Powered Security Scanner (Data Flows, Interactions) |
| `threat-model-analyst` | STRIDE-A Threat Model Analysis |
| `ai-prompt-engineering-safety-review` | Prompt Safety + Bias Review |
| `codeql` | CodeQL Code Scanning Setup |
| `secret-scanning` | GitHub Secret Scanning + Push Protection |
| `gdpr-compliant` | GDPR Engineering Practices |

### Code Quality & Review (7)
| Skill | Beschreibung |
|-------|-------------|
| `refactor` | Surgical Code Refactoring |
| `review-and-refactor` | Code Review + Refactor |
| `doublecheck` | 3-Layer Verification Pipeline für AI Output |
| `editorconfig` | .editorconfig Best Practices |
| `dotnet-best-practices` | .NET/C# Best Practices |

### Documentation & README (8)
| Skill | Beschreibung |
|-------|-------------|
| `create-readme` | README.md generieren |
| `readme-blueprint-generator` | Intelligente README Generation |
| `documentation-writer` | Diátaxis Documentation Expert |
| `create-tldr-page` | tldr Pages erstellen |
| `write-coding-standards-from-file` | Coding Standards aus Code ableiten |
| `convert-plaintext-to-md` | Text → Markdown konvertieren |
| `mkdocs-translations` | MkDocs Übersetzungen |

### Database & Data (9)
| Skill | Beschreibung |
|-------|-------------|
| `sql-optimization` | SQL Performance Optimization (alle DBs) |
| `sql-code-review` | SQL Code Review (alle DBs) |
| `postgresql-optimization` | PostgreSQL-spezifische Optimierung |
| `postgresql-code-review` | PostgreSQL Code Review |
| `ef-core` | Entity Framework Core Best Practices |
| `cosmosdb-datamodeling` | CosmosDB Data Modeling |
| `snowflake-semanticview` | Snowflake Semantic Views |

### DevOps & CI/CD (10)
| Skill | Beschreibung |
|-------|-------------|
| `multi-stage-dockerfile` | Optimierte Multi-Stage Dockerfiles |
| `devops-rollout-plan` | Rollout Plans mit Preflight + Rollback |
| `containerize-aspnetcore` | ASP.NET Core containerisieren |
| `containerize-aspnet-framework` | ASP.NET Framework containerisieren |

### Git & Workflow (13)
| Skill | Beschreibung |
|-------|-------------|
| `git-commit` | Conventional Commit Messages |
| `conventional-commit` | Structured Commit Format |
| `gh-cli` | GitHub CLI Referenz |
| `my-issues` | Meine Issues listen |
| `my-pull-requests` | Meine PRs listen |
| `repo-story-time` | Repo Summary aus Commit History |
| `sponsor-finder` | GitHub Sponsors finden |
| `automate-this` | Screen Recording → Automation Scripts |
| `make-repo-contribution` | Repo Contribution Guidelines folgen |

### Other/Utility (5)
| Skill | Beschreibung |
|-------|-------------|
| `context-map` | File Map vor Changes generieren |
| `excalidraw-diagram-generator` | Excalidraw Diagramme |
| `napkin` | Visual Whiteboard im Browser |
| `image-manipulation-image-magick` | ImageMagick Bildbearbeitung |
| `boost-prompt` | Prompt Refinement Workflow |

---

## Agents (170+)

### Architecture & Planning
| Agent | Beschreibung |
|-------|-------------|
| `arch.agent.md` | Software Architecture |
| `repo-architect.agent.md` | Repository Structure |
| `api-architect.agent.md` | API Design |
| `plan.agent.md` | Implementation Planning |
| `planner.agent.md` | Task Planning |
| `prd.agent.md` | Product Requirements |
| `blueprint-mode.agent.md` | Blueprint Mode |
| `context-architect.agent.md` | Context Engineering |
| `implementation-plan.agent.md` | Implementation Plans |
| `one-shot-feature-issue-planner.agent.md` | Feature → Issues (One Shot) |
| `task-planner.agent.md` | Task Planning |
| `task-researcher.agent.md` | Task Research |

### Frontend & UI
| Agent | Beschreibung |
|-------|-------------|
| `expert-nextjs-developer.agent.md` | Next.js Expert |
| `expert-react-frontend-engineer.agent.md` | React Frontend Expert |
| `gem-designer.agent.md` | UI/UX Design |
| `nuxt-expert.agent.md` | Nuxt.js Expert |
| `vuejs-expert.agent.md` | Vue.js Expert |
| `aem-frontend-specialist.agent.md` | AEM Frontend |

### Backend & API
| Agent | Beschreibung |
|-------|-------------|
| `principal-software-engineer.agent.md` | Principal SWE |
| `expert-dotnet-software-engineer.agent.md` | .NET Expert |
| `expert-cpp-software-engineer.agent.md` | C++ Expert |
| `laravel-expert-agent.agent.md` | Laravel Expert |
| `shopify-expert.agent.md` | Shopify Expert |
| `drupal-expert.agent.md` | Drupal Expert |
| `salesforce-expert.agent.md` | Salesforce Expert |
| `pimcore-expert.agent.md` | Pimcore Expert |

### Testing & QA
| Agent | Beschreibung |
|-------|-------------|
| `playwright-tester.agent.md` | Playwright E2E Testing |
| `polyglot-test-builder.agent.md` | Multi-Language Test Builder |
| `polyglot-test-fixer.agent.md` | Test Fixer |
| `polyglot-test-generator.agent.md` | Test Generator |
| `polyglot-test-implementer.agent.md` | Test Implementer |
| `polyglot-test-linter.agent.md` | Test Linter |
| `polyglot-test-planner.agent.md` | Test Planner |
| `polyglot-test-researcher.agent.md` | Test Research |
| `polyglot-test-tester.agent.md` | Test Runner |
| `tdd-red.agent.md` | TDD: Write Failing Test |
| `tdd-green.agent.md` | TDD: Make Test Pass |
| `tdd-refactor.agent.md` | TDD: Refactor |
| `qa-subagent.agent.md` | QA Sub-Agent |
| `gem-browser-tester.agent.md` | Browser Testing |

### AI & LLM & MCP
| Agent | Beschreibung |
|-------|-------------|
| `prompt-engineer.agent.md` | Prompt Engineering |
| `prompt-builder.agent.md` | Prompt Building |
| `custom-agent-foundry.agent.md` | Custom Agents bauen |
| `typescript-mcp-expert.agent.md` | TypeScript MCP Expert |
| `python-mcp-expert.agent.md` | Python MCP Expert |
| `go-mcp-expert.agent.md` | Go MCP Expert |
| `java-mcp-expert.agent.md` | Java MCP Expert |
| `csharp-mcp-expert.agent.md` | C# MCP Expert |
| `kotlin-mcp-expert.agent.md` | Kotlin MCP Expert |
| `ruby-mcp-expert.agent.md` | Ruby MCP Expert |
| `rust-mcp-expert.agent.md` | Rust MCP Expert |
| `swift-mcp-expert.agent.md` | Swift MCP Expert |
| `php-mcp-expert.agent.md` | PHP MCP Expert |
| `context7.agent.md` | Context7 Integration |
| `comet-opik.agent.md` | Comet/Opik Integration |
| `meta-agentic-project-scaffold.agent.md` | Agentic Project Scaffolding |

### Code Quality & Review
| Agent | Beschreibung |
|-------|-------------|
| `gem-reviewer.agent.md` | Code Review |
| `gem-critic.agent.md` | Critical Analysis |
| `gem-code-simplifier.agent.md` | Code Simplification |
| `doublecheck.agent.md` | 3-Layer Verification |
| `critical-thinking.agent.md` | Critical Thinking |
| `devils-advocate.agent.md` | Devil's Advocate |
| `janitor.agent.md` | Code Cleanup |
| `wg-code-sentinel.agent.md` | Code Quality Guardian |
| `wg-code-alchemist.agent.md` | Code Transformation |

### Security
| Agent | Beschreibung |
|-------|-------------|
| `se-security-reviewer.agent.md` | Security Review |
| `se-responsible-ai-code.agent.md` | Responsible AI Code |
| `agent-governance-reviewer.agent.md` | Agent Governance |
| `jfrog-sec.agent.md` | JFrog Security |
| `stackhawk-security-onboarding.agent.md` | StackHawk Security |
| `defender-scout-kql.agent.md` | Defender KQL |

### DevOps & Infrastructure
| Agent | Beschreibung |
|-------|-------------|
| `devops-expert.agent.md` | DevOps Expert |
| `github-actions-expert.agent.md` | GitHub Actions |
| `platform-sre-kubernetes.agent.md` | Kubernetes SRE |
| `terraform.agent.md` | Terraform |
| `se-gitops-ci-specialist.agent.md` | GitOps CI |
| `gem-devops.agent.md` | DevOps |

### Debugging
| Agent | Beschreibung |
|-------|-------------|
| `debug.agent.md` | Systematic Debugging |
| `gem-debugger.agent.md` | Debugging Expert |

### Documentation
| Agent | Beschreibung |
|-------|-------------|
| `gem-documentation-writer.agent.md` | Documentation |
| `se-technical-writer.agent.md` | Technical Writing |
| `technical-content-evaluator.agent.md` | Content Evaluation |
| `taxcore-technical-writer.agent.md` | TaxCore Docs |
| `code-tour.agent.md` | Code Tour |

### Productivity & Workflow
| Agent | Beschreibung |
|-------|-------------|
| `gem-orchestrator.agent.md` | Multi-Agent Orchestration |
| `gem-planner.agent.md` | Planning |
| `gem-researcher.agent.md` | Research |
| `gem-implementer.agent.md` | Implementation |
| `mentor.agent.md` | Mentoring |
| `mentoring-juniors.agent.md` | Junior Mentoring |
| `demonstrate-understanding.agent.md` | Verify Understanding |
| `gilfoyle.agent.md` | Gilfoyle-Style Reviews |
| `address-comments.agent.md` | PR Comment Resolution |
| `refine-issue.agent.md` | Issue Refinement |
| `software-engineer-agent-v1.agent.md` | Full SWE Agent |
| `swe-subagent.agent.md` | SWE Sub-Agent |

### Beast Modes (Power Agents)
| Agent | Beschreibung |
|-------|-------------|
| `4.1-Beast.agent.md` | Beast Mode v4.1 |
| `Thinking-Beast-Mode.agent.md` | Thinking Beast Mode |
| `Ultimate-Transparent-Thinking-Beast-Mode.agent.md` | Ultimate Thinking Beast |
| `gpt-5-beast-mode.agent.md` | GPT-5 Beast Mode |
| `voidbeast-gpt41enhanced.agent.md` | VoidBeast Enhanced |
| `rust-gpt-4.1-beast-mode.agent.md` | Rust Beast Mode |

### Search & SEO
| Agent | Beschreibung |
|-------|-------------|
| `search-ai-optimization-expert.agent.md` | AI SEO Expert |
| `scientific-paper-research.agent.md` | Paper Research |

### Cloud (Azure)
| Agent | Beschreibung |
|-------|-------------|
| `azure-principal-architect.agent.md` | Azure Architecture |
| `azure-saas-architect.agent.md` | Azure SaaS |
| `azure-iac-generator.agent.md` | Azure IaC Generator |
| `azure-iac-exporter.agent.md` | Azure IaC Exporter |
| `azure-policy-analyzer.agent.md` | Azure Policy |
| `azure-logic-apps-expert.agent.md` | Azure Logic Apps |
| `bicep-plan.agent.md` | Bicep Planning |
| `bicep-implement.agent.md` | Bicep Implementation |
| `terraform-azure-planning.agent.md` | Terraform Azure Planning |
| `terraform-azure-implement.agent.md` | Terraform Azure Implementation |

### UX & Product
| Agent | Beschreibung |
|-------|-------------|
| `se-ux-ui-designer.agent.md` | UX/UI Design |
| `se-product-manager-advisor.agent.md` | Product Manager |
| `simple-app-idea-generator.agent.md` | App Idea Generator |

---

## Hooks (6)

| Hook | Beschreibung | Wann nutzen |
|------|-------------|-------------|
| `secrets-scanner` | Scannt nach API Keys/Secrets vor Commits | IMMER vor git push |
| `dependency-license-checker` | License Compliance Check | Bei dependency Changes |
| `governance-audit` | Agent Governance Audit | Bei Agent-Änderungen |
| `session-auto-commit` | Automatische Commits | Für Continuous Saving |
| `session-logger` | Session Tracking/Logging | Für Audit Trail |
| `tool-guardian` | Tool Usage Kontrolle | Für Safety |

---

## Plugins (55)

### Für KaderOS direkt relevant
| Plugin | Was es bündelt |
|--------|---------------|
| `frontend-web-dev` | Frontend Skills + Agents + Instructions |
| `project-planning` | Planning Skills + Agents |
| `security-best-practices` | Security Skills + Reviews |
| `software-engineering-team` | Full Dev Team (alle Rollen) |
| `testing-automation` | Test Skills + Agents |
| `context-engineering` | Context Management |
| `structured-autonomy` | Autonomous Agent Workflows |
| `gem-team` | Multi-Agent Team (Orchestrator, Planner, etc.) |
| `typescript-mcp-development` | TypeScript MCP Server Dev |
| `python-mcp-development` | Python MCP Server Dev |
| `napkin` | Visual Whiteboard |
| `doublecheck` | AI Output Verification |
| `automate-this` | Process Automation |

### Weitere verfügbar
| Plugin | Was es bündelt |
|--------|---------------|
| `azure-cloud-development` | Azure Dev Stack |
| `cast-imaging` | CAST Imaging Analysis |
| `clojure-interactive-programming` | Clojure REPL |
| `copilot-sdk` | Copilot SDK |
| `csharp-dotnet-development` | C#/.NET Stack |
| `csharp-mcp-development` | C# MCP Dev |
| `database-data-management` | DB Management |
| `dataverse-sdk-for-python` | Dataverse Python SDK |
| `devops-oncall` | DevOps On-Call |
| `edge-ai-tasks` | Edge AI Tasks |
| `fastah-ip-geo-tools` | IP Geolocation |
| `flowstudio-power-automate` | Power Automate |
| `go-mcp-development` | Go MCP Dev |
| `java-development` | Java Stack |
| `java-mcp-development` | Java MCP Dev |
| `kotlin-mcp-development` | Kotlin MCP Dev |
| `mcp-m365-copilot` | M365 Copilot MCP |
| `noob-mode` | Beginner-Friendly Mode |
| `openapi-to-application-*` | OpenAPI → App (6 Sprachen) |
| `oracle-to-postgres-migration-expert` | Oracle → Postgres |
| `ospo-sponsorship` | Open Source Sponsorship |
| `partners` | Partner Integration |
| `pcf-development` | Power Apps PCF |
| `php-mcp-development` | PHP MCP Dev |
| `polyglot-test-agent` | Multi-Language Testing |
| `power-apps-code-apps` | Power Apps |
| `power-bi-development` | Power BI |
| `power-platform-mcp-connector-development` | Power Platform MCP |
| `roundup` | Status Briefings |
| `ruby-mcp-development` | Ruby MCP Dev |
| `rug-agentic-workflow` | RUG Agentic Workflow |
| `rust-mcp-development` | Rust MCP Dev |
| `swift-mcp-development` | Swift MCP Dev |
| `technical-spike` | Technical Spikes |
| `typespec-m365-copilot` | TypeSpec M365 |
| `winui3-development` | WinUI 3 |

---

## Instructions (180+)

### Frontend
- `nextjs.instructions.md` — Next.js Best Practices
- `nextjs-tailwind.instructions.md` — Next.js + Tailwind
- `html-css-style-color-guide.instructions.md` — HTML/CSS Style Guide
- `tailwind-v4-vite.instructions.md` — Tailwind v4 + Vite
- `tanstack-start-shadcn-tailwind.instructions.md` — TanStack + shadcn
- `svelte.instructions.md` — Svelte
- `astro.instructions.md` — Astro

### Backend
- `nestjs.instructions.md` — NestJS
- `nodejs-javascript-vitest.instructions.md` — Node.js + Vitest
- `springboot.instructions.md` — Spring Boot
- `quarkus.instructions.md` — Quarkus

### TypeScript/JavaScript
- `typescript-mcp-server.instructions.md` — TypeScript MCP Server
- `javascript-typescript-jest` — Jest Testing

### Python
- `python-mcp-server.instructions.md` — Python MCP Server
- `langchain-python.instructions.md` — LangChain

### Go
- `go.instructions.md` — Go Best Practices
- `go-mcp-server.instructions.md` — Go MCP Server

### Rust
- `rust.instructions.md` — Rust Best Practices
- `rust-mcp-server.instructions.md` — Rust MCP Server

### DevOps & Cloud
- `github-actions-ci-cd-best-practices.instructions.md` — GitHub Actions
- `containerization-docker-best-practices.instructions.md` — Docker
- `kubernetes-deployment-best-practices.instructions.md` — Kubernetes
- `terraform.instructions.md` — Terraform
- `terraform-azure.instructions.md` — Terraform Azure
- `devops-core-principles.instructions.md` — DevOps Core

### Testing
- `playwright-typescript.instructions.md` — Playwright + TypeScript
- `playwright-python.instructions.md` — Playwright + Python
- `playwright-dotnet.instructions.md` — Playwright + .NET

### Security
- `security-and-owasp.instructions.md` — OWASP Security
- `agent-safety.instructions.md` — Agent Safety

### Documentation
- `markdown.instructions.md` — Markdown
- `markdown-gfm.instructions.md` — GitHub Flavored Markdown
- `markdown-content-creation.instructions.md` — Content Creation
- `markdown-accessibility.instructions.md` — Accessible Markdown

### Context Engineering
- `context-engineering.instructions.md` — Context Engineering
- `context7.instructions.md` — Context7 Integration
- `memory-bank.instructions.md` — Memory Bank Pattern

### Code Quality
- `code-review-generic.instructions.md` — Generic Code Review
- `performance-optimization.instructions.md` — Performance
- `self-explanatory-code-commenting.instructions.md` — Self-Explanatory Code
- `object-calisthenics.instructions.md` — Object Calisthenics
- `oop-design-patterns.instructions.md` — OOP Design Patterns

---

## Workflows (7)

| Workflow | Beschreibung |
|----------|-------------|
| `daily-issues-report.md` | Täglicher Issue Report |
| `ospo-contributors-report.md` | Contributors Report |
| `ospo-org-health.md` | Organization Health |
| `ospo-release-compliance-checker.md` | Release Compliance |
| `ospo-stale-repos.md` | Stale Repos Check |
| `relevance-check.md` | Code Relevance Check |
| `relevance-summary.md` | Relevance Summary |

---

## Scripts (2)

| Script | Beschreibung |
|--------|-------------|
| `delete-gone-branches.sh` | Gelöschte Remote Branches lokal aufräumen |
| `fix-line-endings.sh` | Line Endings fixen |

---

*Letzte Aktualisierung: 3. April 2026*
