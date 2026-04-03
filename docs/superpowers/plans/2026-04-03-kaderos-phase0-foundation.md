# KaderOS Phase 0: Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing KaderOS dashboard from demo data to a working app with real DB integration, encrypted connector storage, and a first working agent adapter (Claude API).

**Architecture:** Keep the existing Next.js monorepo. Replace demo data with Supabase queries. Add connector_credentials table for encrypted API key storage. Build a simplified adapter system inspired by Paperclip's pattern. Everything runs through Supabase — no separate API server yet.

**Tech Stack:** Next.js 15, React 19, Supabase (Auth + DB + Realtime), Drizzle ORM, Tailwind v4, TypeScript

**Referenz-Dateien:**
- Dashboard: `/Users/thesh/Documents/KaderOS/apps/web/app/dashboard/page.tsx`
- DB Schema: `/Users/thesh/Documents/KaderOS/packages/db/schema/`
- API Routes: `/Users/thesh/Documents/KaderOS/apps/web/app/api/`
- Auth Utils: `/Users/thesh/Documents/KaderOS/apps/web/utils/supabase/`
- Paperclip Adapter Pattern: `/tmp/paperclip/packages/adapter-utils/src/types.ts`
- Paperclip Secrets: `/tmp/paperclip/server/src/secrets/local-encrypted-provider.ts`

---

## File Structure

### New Files

```
apps/web/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx                    # Dashboard layout with sidebar nav
│   │   ├── page.tsx                      # Overview/Home (refactored from monolith)
│   │   ├── team/page.tsx                 # Agents list view
│   │   ├── team/[id]/page.tsx            # Agent detail view
│   │   ├── team/new/page.tsx             # Create agent wizard
│   │   ├── aufgaben/page.tsx             # Tasks board
│   │   ├── ziele/page.tsx                # Goals view
│   │   ├── finanzen/page.tsx             # Budget & costs
│   │   ├── connectors/page.tsx           # Connector management
│   │   ├── aktivitaet/page.tsx           # Activity log
│   │   └── einstellungen/page.tsx        # Settings
│   ├── onboarding/
│   │   └── page.tsx                      # 3-step onboarding wizard
│   └── api/
│       ├── agents/route.ts               # (EXISTS — refactor)
│       ├── agents/[id]/route.ts          # (EXISTS — refactor)
│       ├── agents/[id]/run/route.ts      # Trigger agent heartbeat
│       ├── companies/route.ts            # Company CRUD
│       ├── tasks/route.ts                # Task CRUD
│       ├── tasks/[id]/route.ts           # Task detail
│       ├── goals/route.ts                # Goal CRUD
│       ├── connectors/route.ts           # Connector CRUD (encrypted)
│       ├── connectors/[id]/test/route.ts # Test connector
│       ├── activity/route.ts             # Activity log read
│       └── costs/route.ts               # Cost summary
├── lib/
│   ├── crypto.ts                         # AES-256-GCM encrypt/decrypt
│   ├── activity.ts                       # Activity logging helper
│   └── adapters/
│       ├── types.ts                      # Adapter interface
│       ├── registry.ts                   # Adapter registry
│       └── claude-api.ts                 # Claude API adapter
└── hooks/
    ├── use-agents.ts                     # React Query hook for agents
    ├── use-tasks.ts                      # React Query hook for tasks
    ├── use-goals.ts                      # React Query hook for goals
    ├── use-company.ts                    # React Query hook for company
    ├── use-connectors.ts                 # React Query hook for connectors
    └── use-activity.ts                   # React Query hook for activity

packages/db/
├── schema/
│   ├── connector_credentials.ts          # NEW — encrypted API key storage
│   └── activity_log.ts                   # NEW — audit trail
└── migrations/
    ├── 002_create_companies.sql          # NEW
    ├── 003_create_connector_credentials.sql # NEW
    └── 004_create_activity_log.sql       # NEW
```

### Modified Files

```
apps/web/app/dashboard/page.tsx           # Refactor: split into sub-pages
apps/web/app/api/agents/route.ts          # Refactor: company-scoped
apps/web/app/api/agents/[id]/route.ts     # Refactor: company-scoped
apps/web/middleware.ts                     # Add: onboarding redirect
apps/web/package.json                     # Add: @tanstack/react-query, swr
```

---

### Task 1: DB Migration — connector_credentials + activity_log

**Files:**
- Create: `packages/db/schema/connector_credentials.ts`
- Create: `packages/db/schema/activity_log.ts`
- Modify: `packages/db/schema/index.ts`

- [ ] **Step 1: Create connector_credentials schema**

```typescript
// packages/db/schema/connector_credentials.ts
import { pgTable, uuid, text, timestamp, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const connectorCredentials = pgTable(
  "connector_credentials",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    provider: text("provider").notNull(), // "openai", "anthropic", "bexio", "gmail", etc.
    label: text("label"), // User-friendly name, e.g. "Mein OpenAI Key"
    credentialType: text("credential_type").notNull().default("api_key"), // "api_key", "oauth_token"
    encryptedValue: jsonb("encrypted_value").notNull(), // { scheme, iv, tag, ciphertext }
    valueSha256: text("value_sha256").notNull(), // For comparison without decryption
    metadata: jsonb("metadata").default({}), // { model, scopes, expiresAt, etc. }
    isActive: text("is_active").notNull().default("true"),
    lastTestedAt: timestamp("last_tested_at"),
    lastTestResult: text("last_test_result"), // "success", "failed", "untested"
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    companyProviderIdx: index("cc_company_provider_idx").on(table.companyId, table.provider),
    companyProviderUq: uniqueIndex("cc_company_provider_uq").on(table.companyId, table.provider, table.userId),
  }),
);
```

- [ ] **Step 2: Create activity_log schema**

```typescript
// packages/db/schema/activity_log.ts
import { pgTable, uuid, text, timestamp, jsonb, index } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const activityLog = pgTable(
  "activity_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
    actorType: text("actor_type").notNull(), // "user", "agent", "system"
    actorId: text("actor_id").notNull(),
    action: text("action").notNull(), // "agent_created", "task_completed", "connector_added", etc.
    entityType: text("entity_type").notNull(), // "agent", "task", "connector", "goal"
    entityId: text("entity_id").notNull(),
    agentId: uuid("agent_id"),
    details: jsonb("details").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    companyIdx: index("al_company_idx").on(table.companyId),
    companyActionIdx: index("al_company_action_idx").on(table.companyId, table.action),
    createdAtIdx: index("al_created_at_idx").on(table.createdAt),
  }),
);
```

- [ ] **Step 3: Update schema index**

Add to `packages/db/schema/index.ts`:
```typescript
export * from "./connector_credentials";
export * from "./activity_log";
```

- [ ] **Step 4: Deploy migration to Supabase**

Run via psql:
```sql
-- connector_credentials
CREATE TABLE connector_credentials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  provider TEXT NOT NULL,
  label TEXT,
  credential_type TEXT NOT NULL DEFAULT 'api_key',
  encrypted_value JSONB NOT NULL,
  value_sha256 TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  is_active TEXT NOT NULL DEFAULT 'true',
  last_tested_at TIMESTAMP,
  last_test_result TEXT,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE INDEX cc_company_provider_idx ON connector_credentials(company_id, provider);
CREATE UNIQUE INDEX cc_company_provider_uq ON connector_credentials(company_id, provider, user_id);
ALTER TABLE connector_credentials ENABLE ROW LEVEL SECURITY;

-- activity_log
CREATE TABLE activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  actor_type TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  agent_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE INDEX al_company_idx ON activity_log(company_id);
CREATE INDEX al_company_action_idx ON activity_log(company_id, action);
CREATE INDEX al_created_at_idx ON activity_log(created_at);
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
```

- [ ] **Step 5: Verify tables exist**

```bash
PGPASSWORD="h5zIfnknPlnTK50R" psql -h db.oxxfmimytrmvbkvhttvl.supabase.co -p 5432 -U postgres -d postgres -c "\dt public.*"
```

Expected: 19 tables (17 existing + connector_credentials + activity_log)

- [ ] **Step 6: Commit**

```bash
git add packages/db/schema/connector_credentials.ts packages/db/schema/activity_log.ts packages/db/schema/index.ts
git commit -m "feat(db): add connector_credentials and activity_log tables"
```

---

### Task 2: Encryption Library (AES-256-GCM)

**Files:**
- Create: `apps/web/lib/crypto.ts`

- [ ] **Step 1: Create crypto utility**

```typescript
// apps/web/lib/crypto.ts
import { createCipheriv, createDecipheriv, randomBytes, createHash } from "crypto";

interface EncryptedPayload {
  scheme: "aes256gcm_v1";
  iv: string;
  tag: string;
  ciphertext: string;
}

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

function getMasterKey(): Buffer {
  const key = process.env.KADEROS_MASTER_KEY;
  if (!key) {
    throw new Error("KADEROS_MASTER_KEY environment variable is required");
  }
  // Accept hex (64 chars) or base64 (44 chars)
  if (key.length === 64) return Buffer.from(key, "hex");
  return Buffer.from(key, "base64");
}

export function encrypt(plaintext: string): EncryptedPayload {
  const masterKey = getMasterKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, masterKey, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    scheme: "aes256gcm_v1",
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
}

export function decrypt(payload: EncryptedPayload): string {
  if (payload.scheme !== "aes256gcm_v1") {
    throw new Error(`Unknown encryption scheme: ${payload.scheme}`);
  }
  const masterKey = getMasterKey();
  const iv = Buffer.from(payload.iv, "base64");
  const tag = Buffer.from(payload.tag, "base64");
  const ciphertext = Buffer.from(payload.ciphertext, "base64");
  const decipher = createDecipheriv(ALGORITHM, masterKey, iv);
  decipher.setAuthTag(tag);
  const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plain.toString("utf8");
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
```

- [ ] **Step 2: Generate and add master key to .env.local**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add to `apps/web/.env.local`:
```
KADEROS_MASTER_KEY=<generated_base64_key>
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/lib/crypto.ts
git commit -m "feat(crypto): AES-256-GCM encryption for connector credentials"
```

---

### Task 3: Activity Logging Helper

**Files:**
- Create: `apps/web/lib/activity.ts`

- [ ] **Step 1: Create activity logging utility**

```typescript
// apps/web/lib/activity.ts
import { createClient } from "@/utils/supabase/server";

interface LogActivityInput {
  companyId: string;
  actorType: "user" | "agent" | "system";
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  agentId?: string;
  details?: Record<string, unknown>;
}

export async function logActivity(input: LogActivityInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("activity_log").insert({
    company_id: input.companyId,
    actor_type: input.actorType,
    actor_id: input.actorId,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId,
    agent_id: input.agentId ?? null,
    details: input.details ?? {},
  });
  if (error) {
    console.error("Failed to log activity:", error);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/lib/activity.ts
git commit -m "feat(activity): add activity logging helper"
```

---

### Task 4: Company API + Onboarding

**Files:**
- Create: `apps/web/app/api/companies/route.ts`
- Create: `apps/web/app/onboarding/page.tsx`
- Modify: `apps/web/middleware.ts`

- [ ] **Step 1: Create company API route**

```typescript
// apps/web/app/api/companies/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ companies: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, slug, mission, locale, currency } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const companySlug = slug || name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");

  const { data, error } = await supabase
    .from("companies")
    .insert({
      name,
      slug: companySlug,
      mission: mission || null,
      locale: locale || "de-CH",
      currency: currency || "CHF",
      timezone: "Europe/Zurich",
      settings: { owner_id: user.id },
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ company: data }, { status: 201 });
}
```

- [ ] **Step 2: Create onboarding page**

```tsx
// apps/web/app/onboarding/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Users, Plug, ArrowRight, Loader2 } from "lucide-react";

const TEMPLATES = [
  { id: "side-hustle", name: "Side Hustle", agents: 2, desc: "Allrounder + Assistent" },
  { id: "startup", name: "Startup", agents: 4, desc: "CEO, CTO, Sales, Content" },
  { id: "agentur", name: "Agentur", agents: 5, desc: "CEO, PM, Designer, Dev, Content" },
  { id: "freelancer", name: "Freelancer Pro", agents: 3, desc: "Assistent, Buchhalter, Content" },
  { id: "leer", name: "Leer starten", agents: 0, desc: "Baue dein Team selbst auf" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [template, setTemplate] = useState("startup");
  const [apiKey, setApiKey] = useState("");

  async function handleComplete() {
    setLoading(true);
    try {
      // 1. Create company
      const companyRes = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: companyName }),
      });
      const { company } = await companyRes.json();

      // 2. Store API key if provided
      if (apiKey) {
        await fetch("/api/connectors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId: company.id,
            provider: "anthropic",
            label: "Claude API Key",
            value: apiKey,
          }),
        });
      }

      // 3. Import template agents
      if (template !== "leer") {
        await fetch(`/api/companies/${company.id}/import-template`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateId: template }),
        });
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Onboarding failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${s <= step ? "bg-[#000088]" : "bg-gray-200"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-[#000088]" />
              <h1 className="text-2xl font-bold">Wie heisst dein Unternehmen?</h1>
            </div>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="z.B. Mein Startup"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-[#000088]"
              autoFocus
            />
            <button
              onClick={() => companyName && setStep(2)}
              disabled={!companyName}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#000088] text-white rounded-lg font-medium disabled:opacity-40"
            >
              Weiter <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-[#000088]" />
              <h1 className="text-2xl font-bold">Wähl dein Starter-Team</h1>
            </div>
            <div className="space-y-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition ${
                    template === t.id ? "border-[#000088] bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-500">
                    {t.agents > 0 ? `${t.agents} Agents: ${t.desc}` : t.desc}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#000088] text-white rounded-lg font-medium"
            >
              Weiter <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Plug className="w-8 h-8 text-[#000088]" />
              <h1 className="text-2xl font-bold">Verbinde dein AI</h1>
            </div>
            <p className="text-gray-500 mb-4">
              Gib deinen API Key ein, damit deine Agents arbeiten können. Du findest ihn auf console.anthropic.com oder platform.openai.com.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-... oder sk-..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:border-[#000088]"
            />
            <button
              onClick={handleComplete}
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#000088] text-white rounded-lg font-medium disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Wird eingerichtet...</>
              ) : (
                "Los geht's"
              )}
            </button>
            <button
              onClick={handleComplete}
              className="mt-3 w-full text-center text-sm text-gray-400 hover:text-gray-600"
            >
              Später verbinden →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update middleware for onboarding redirect**

In `apps/web/middleware.ts`, add onboarding check — if user is authenticated but has no company, redirect to `/onboarding`:

```typescript
// Add after existing auth check in middleware.ts
// After confirming user is authenticated and heading to /dashboard:
if (request.nextUrl.pathname.startsWith("/dashboard")) {
  const { data: companies } = await supabase
    .from("companies")
    .select("id")
    .limit(1);

  if (!companies || companies.length === 0) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/api/companies/route.ts apps/web/app/onboarding/page.tsx apps/web/middleware.ts
git commit -m "feat: company creation API + 3-step onboarding wizard"
```

---

### Task 5: Connector API (Encrypted Key Storage)

**Files:**
- Create: `apps/web/app/api/connectors/route.ts`
- Create: `apps/web/app/api/connectors/[id]/test/route.ts`

- [ ] **Step 1: Create connector CRUD API**

```typescript
// apps/web/app/api/connectors/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { encrypt, sha256 } from "@/lib/crypto";

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Return connectors WITHOUT encrypted values
  const { data, error } = await supabase
    .from("connector_credentials")
    .select("id, provider, label, credential_type, metadata, is_active, last_tested_at, last_test_result, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ connectors: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { companyId, provider, label, value, credentialType, metadata } = body;

  if (!provider || !value || !companyId) {
    return NextResponse.json({ error: "provider, value, and companyId required" }, { status: 400 });
  }

  const encryptedValue = encrypt(value);
  const valueHash = sha256(value);

  const { data, error } = await supabase
    .from("connector_credentials")
    .upsert(
      {
        company_id: companyId,
        user_id: user.id,
        provider,
        label: label || provider,
        credential_type: credentialType || "api_key",
        encrypted_value: encryptedValue,
        value_sha256: valueHash,
        metadata: metadata || {},
        is_active: "true",
        last_test_result: "untested",
      },
      { onConflict: "company_id,provider,user_id" },
    )
    .select("id, provider, label, credential_type, metadata, is_active, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ connector: data }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("connector_credentials")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Create connector test endpoint**

```typescript
// apps/web/app/api/connectors/[id]/test/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/crypto";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: connector, error } = await supabase
    .from("connector_credentials")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !connector) {
    return NextResponse.json({ error: "Connector not found" }, { status: 404 });
  }

  const apiKey = decrypt(connector.encrypted_value);
  let testResult: { success: boolean; message: string };

  try {
    switch (connector.provider) {
      case "anthropic": {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 10,
            messages: [{ role: "user", content: "Hi" }],
          }),
        });
        testResult = res.ok
          ? { success: true, message: "Anthropic API verbunden" }
          : { success: false, message: `Fehler: ${res.status}` };
        break;
      }
      case "openai": {
        const res = await fetch("https://api.openai.com/v1/models", {
          headers: { Authorization: `Bearer ${apiKey}` },
        });
        testResult = res.ok
          ? { success: true, message: "OpenAI API verbunden" }
          : { success: false, message: `Fehler: ${res.status}` };
        break;
      }
      case "deepl": {
        const res = await fetch("https://api-free.deepl.com/v2/usage", {
          headers: { Authorization: `DeepL-Auth-Key ${apiKey}` },
        });
        testResult = res.ok
          ? { success: true, message: "DeepL API verbunden" }
          : { success: false, message: `Fehler: ${res.status}` };
        break;
      }
      default:
        testResult = { success: true, message: "Key gespeichert (kein Test verfügbar)" };
    }
  } catch (err) {
    testResult = { success: false, message: "Verbindung fehlgeschlagen" };
  }

  await supabase
    .from("connector_credentials")
    .update({
      last_tested_at: new Date().toISOString(),
      last_test_result: testResult.success ? "success" : "failed",
    })
    .eq("id", id);

  return NextResponse.json(testResult);
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/api/connectors/
git commit -m "feat(connectors): encrypted credential storage + provider test endpoints"
```

---

### Task 6: Refactor Agent API (Company-Scoped)

**Files:**
- Modify: `apps/web/app/api/agents/route.ts`
- Modify: `apps/web/app/api/agents/[id]/route.ts`

- [ ] **Step 1: Refactor agents route to be company-scoped**

Replace the existing `apps/web/app/api/agents/route.ts` with company-scoped version that queries by `company_id` from the full agents table (not the simplified migration one). The agents table in Supabase already has the full schema from Task 1 of this session.

```typescript
// apps/web/app/api/agents/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/lib/activity";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const companyId = req.nextUrl.searchParams.get("companyId");
  if (!companyId) {
    return NextResponse.json({ error: "companyId required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ agents: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { companyId, name, role, type, systemPrompt, jobDescription, config, skills, accentColor } = body;

  if (!companyId || !name || !role) {
    return NextResponse.json({ error: "companyId, name, and role required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("agents")
    .insert({
      company_id: companyId,
      name,
      role,
      type: type || "claude",
      system_prompt: systemPrompt || null,
      job_description: jobDescription || null,
      config: config || {},
      skills: skills || [],
      accent_color: accentColor || "#3739C1",
      status: "active",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logActivity({
    companyId,
    actorType: "user",
    actorId: user.id,
    action: "agent_created",
    entityType: "agent",
    entityId: data.id,
    details: { name, role, type: type || "claude" },
  });

  return NextResponse.json({ agent: data }, { status: 201 });
}
```

- [ ] **Step 2: Refactor agent detail route**

```typescript
// apps/web/app/api/agents/[id]/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/lib/activity";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }
  return NextResponse.json({ agent: data });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  const allowedFields = [
    "name", "role", "type", "status", "system_prompt", "job_description",
    "config", "skills", "focus", "accent_color", "department_id",
  ];
  for (const field of allowedFields) {
    if (body[field] !== undefined) updates[field] = body[field];
  }

  const { data, error } = await supabase
    .from("agents")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logActivity({
    companyId: data.company_id,
    actorType: "user",
    actorId: user.id,
    action: "agent_updated",
    entityType: "agent",
    entityId: id,
    details: { fields: Object.keys(updates).filter((k) => k !== "updated_at") },
  });

  return NextResponse.json({ agent: data });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get agent info before delete for logging
  const { data: agent } = await supabase.from("agents").select("company_id, name").eq("id", id).single();

  const { error } = await supabase.from("agents").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (agent) {
    await logActivity({
      companyId: agent.company_id,
      actorType: "user",
      actorId: user.id,
      action: "agent_deleted",
      entityType: "agent",
      entityId: id,
      details: { name: agent.name },
    });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/api/agents/
git commit -m "refactor(agents): company-scoped API with activity logging"
```

---

### Task 7: Task & Goal API Routes

**Files:**
- Create: `apps/web/app/api/tasks/route.ts`
- Create: `apps/web/app/api/tasks/[id]/route.ts`
- Create: `apps/web/app/api/goals/route.ts`
- Create: `apps/web/app/api/activity/route.ts`
- Create: `apps/web/app/api/costs/route.ts`

- [ ] **Step 1: Create tasks API**

```typescript
// apps/web/app/api/tasks/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/lib/activity";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const companyId = req.nextUrl.searchParams.get("companyId");
  if (!companyId) return NextResponse.json({ error: "companyId required" }, { status: 400 });

  const { data, error } = await supabase
    .from("tasks")
    .select("*, agents(name, accent_color)")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ tasks: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { companyId, title, description, priority, agentId, dueDate, goalId } = body;
  if (!companyId || !title) return NextResponse.json({ error: "companyId and title required" }, { status: 400 });

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      company_id: companyId,
      title,
      description: description || null,
      priority: priority || "medium",
      status: "todo",
      agent_id: agentId || null,
      due_date: dueDate || null,
      goal_id: goalId || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logActivity({
    companyId,
    actorType: "user",
    actorId: user.id,
    action: "task_created",
    entityType: "task",
    entityId: data.id,
    agentId: agentId || undefined,
    details: { title, priority: priority || "medium" },
  });

  return NextResponse.json({ task: data }, { status: 201 });
}
```

- [ ] **Step 2: Create task detail route**

```typescript
// apps/web/app/api/tasks/[id]/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/lib/activity";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

  const allowedFields = ["title", "description", "priority", "status", "agent_id", "due_date", "goal_id"];
  for (const field of allowedFields) {
    if (body[field] !== undefined) updates[field] = body[field];
  }

  if (body.status === "done") {
    updates.completed_at = new Date().toISOString();
  }

  const { data, error } = await supabase.from("tasks").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logActivity({
    companyId: data.company_id,
    actorType: "user",
    actorId: user.id,
    action: body.status ? "task_status_changed" : "task_updated",
    entityType: "task",
    entityId: id,
    agentId: data.agent_id || undefined,
    details: { status: body.status, fields: Object.keys(updates) },
  });

  return NextResponse.json({ task: data });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Create goals API**

```typescript
// apps/web/app/api/goals/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const companyId = req.nextUrl.searchParams.get("companyId");
  if (!companyId) return NextResponse.json({ error: "companyId required" }, { status: 400 });

  const { data, error } = await supabase
    .from("goals")
    .select("*, agents(name)")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ goals: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { companyId, title, description, ownerAgentId, deadline } = body;
  if (!companyId || !title) return NextResponse.json({ error: "companyId and title required" }, { status: 400 });

  const { data, error } = await supabase
    .from("goals")
    .insert({
      company_id: companyId,
      title,
      description: description || null,
      owner_agent_id: ownerAgentId || null,
      deadline: deadline || null,
      progress: 0,
      status: "on-track",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ goal: data }, { status: 201 });
}
```

- [ ] **Step 4: Create activity log API**

```typescript
// apps/web/app/api/activity/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const companyId = req.nextUrl.searchParams.get("companyId");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50");
  if (!companyId) return NextResponse.json({ error: "companyId required" }, { status: 400 });

  const { data, error } = await supabase
    .from("activity_log")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ activities: data });
}
```

- [ ] **Step 5: Create costs summary API**

```typescript
// apps/web/app/api/costs/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const companyId = req.nextUrl.searchParams.get("companyId");
  if (!companyId) return NextResponse.json({ error: "companyId required" }, { status: 400 });

  const { data: budgets, error } = await supabase
    .from("budgets")
    .select("*, agents(name)")
    .eq("company_id", companyId)
    .order("period", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: costEntries } = await supabase
    .from("cost_entries")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(100);

  return NextResponse.json({ budgets: budgets || [], costEntries: costEntries || [] });
}
```

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/api/tasks/ apps/web/app/api/goals/ apps/web/app/api/activity/ apps/web/app/api/costs/
git commit -m "feat(api): add task, goal, activity, and cost API routes"
```

---

### Task 8: Dashboard Layout + Split Views

**Files:**
- Create: `apps/web/app/dashboard/layout.tsx`
- Modify: `apps/web/app/dashboard/page.tsx`

- [ ] **Step 1: Create dashboard layout with sidebar**

```tsx
// apps/web/app/dashboard/layout.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2, Users, ClipboardList, Target, Wallet,
  Plug, Activity, Settings, Menu, X,
} from "lucide-react";
import { useState, createContext, useContext, useEffect } from "react";

interface CompanyContextType {
  companyId: string | null;
  companyName: string | null;
  setCompany: (id: string, name: string) => void;
}

export const CompanyContext = createContext<CompanyContextType>({
  companyId: null,
  companyName: null,
  setCompany: () => {},
});

export function useCompany() {
  return useContext(CompanyContext);
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "Übersicht", icon: Building2 },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/aufgaben", label: "Aufgaben", icon: ClipboardList },
  { href: "/dashboard/ziele", label: "Ziele", icon: Target },
  { href: "/dashboard/finanzen", label: "Finanzen", icon: Wallet },
  { href: "/dashboard/connectors", label: "Connectors", icon: Plug },
  { href: "/dashboard/aktivitaet", label: "Aktivität", icon: Activity },
  { href: "/dashboard/einstellungen", label: "Einstellungen", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);

  useEffect(() => {
    // Load company on mount
    fetch("/api/companies")
      .then((r) => r.json())
      .then(({ companies }) => {
        if (companies && companies.length > 0) {
          setCompanyId(companies[0].id);
          setCompanyName(companies[0].name);
        }
      })
      .catch(console.error);
  }, []);

  function setCompany(id: string, name: string) {
    setCompanyId(id);
    setCompanyName(name);
  }

  return (
    <CompanyContext.Provider value={{ companyId, companyName, setCompany }}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex md:w-56 flex-col bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#000088] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-lg">KaderOS</span>
            </Link>
            {companyName && (
              <p className="text-xs text-gray-400 mt-1 truncate">{companyName}</p>
            )}
          </div>
          <nav className="flex-1 p-2 space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-[#000088] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#000088] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="font-bold">KaderOS</span>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white pt-16">
            <nav className="p-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base ${
                      isActive ? "bg-[#000088] text-white" : "text-gray-600"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto md:pt-0 pt-14">
          <div className="p-4 md:p-8 max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </CompanyContext.Provider>
  );
}
```

- [ ] **Step 2: Refactor dashboard/page.tsx to overview page**

Replace the monolithic dashboard with a clean overview that loads real data:

```tsx
// apps/web/app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useCompany } from "./layout";
import { Users, ClipboardList, Target, Activity, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const { companyId, companyName } = useCompany();
  const [stats, setStats] = useState({ agents: 0, tasks: 0, goals: 0, activities: 0 });
  const [agents, setAgents] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (!companyId) return;

    Promise.all([
      fetch(`/api/agents?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/tasks?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/goals?companyId=${companyId}`).then((r) => r.json()),
      fetch(`/api/activity?companyId=${companyId}&limit=5`).then((r) => r.json()),
    ]).then(([agentsRes, tasksRes, goalsRes, activityRes]) => {
      setAgents(agentsRes.agents || []);
      setRecentActivity(activityRes.activities || []);
      setStats({
        agents: agentsRes.agents?.length || 0,
        tasks: tasksRes.tasks?.length || 0,
        goals: goalsRes.goals?.length || 0,
        activities: activityRes.activities?.length || 0,
      });
    });
  }, [companyId]);

  if (!companyId) {
    return <div className="text-gray-400">Lädt...</div>;
  }

  const STAT_CARDS = [
    { label: "Agents", value: stats.agents, icon: Users, href: "/dashboard/team", color: "bg-blue-50 text-blue-700" },
    { label: "Aufgaben", value: stats.tasks, icon: ClipboardList, href: "/dashboard/aufgaben", color: "bg-purple-50 text-purple-700" },
    { label: "Ziele", value: stats.goals, icon: Target, href: "/dashboard/ziele", color: "bg-green-50 text-green-700" },
    { label: "Aktivitäten", value: stats.activities, icon: Activity, href: "/dashboard/aktivitaet", color: "bg-orange-50 text-orange-700" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{companyName}</h1>
          <p className="text-gray-500 text-sm">Dein AI-Team Überblick</p>
        </div>
        <Link
          href="/dashboard/team/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#000088] text-white rounded-lg text-sm font-medium hover:bg-[#000066]"
        >
          <Plus className="w-4 h-4" /> Agent hinzufügen
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition"
          >
            <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Team Preview */}
      {agents.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Dein Team</h2>
            <Link href="/dashboard/team" className="text-sm text-[#000088]">Alle anzeigen →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {agents.slice(0, 6).map((agent: any) => (
              <div key={agent.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: agent.accent_color || "#3739C1" }}
                >
                  {agent.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{agent.name}</div>
                  <div className="text-xs text-gray-400 truncate">{agent.role}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  agent.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {agent.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Letzte Aktivität</h2>
            <Link href="/dashboard/aktivitaet" className="text-sm text-[#000088]">Alle anzeigen →</Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((act: any) => (
              <div key={act.id} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#000088]" />
                <span className="text-gray-600">{act.action.replace(/_/g, " ")}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400 text-xs">
                  {new Date(act.created_at).toLocaleString("de-CH")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {agents.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Dein Team ist noch leer</h2>
          <p className="text-gray-500 mb-6">Starte indem du deinen ersten AI-Agent erstellst.</p>
          <Link
            href="/dashboard/team/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#000088] text-white rounded-lg font-medium"
          >
            <Plus className="w-4 h-4" /> Ersten Agent erstellen
          </Link>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/dashboard/layout.tsx apps/web/app/dashboard/page.tsx
git commit -m "feat(dashboard): sidebar layout + overview with real data"
```

---

### Task 9: Team (Agents) Page

**Files:**
- Create: `apps/web/app/dashboard/team/page.tsx`
- Create: `apps/web/app/dashboard/team/new/page.tsx`

- [ ] **Step 1: Create team list page**

```tsx
// apps/web/app/dashboard/team/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useCompany } from "../layout";
import { Plus, MoreHorizontal, Play, Pause, Trash2 } from "lucide-react";
import Link from "next/link";

const TYPE_LABELS: Record<string, string> = {
  claude: "Claude", gpt: "GPT", mistral: "Mistral", ollama: "Ollama", custom: "Custom",
};

export default function TeamPage() {
  const { companyId } = useCompany();
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;
    fetch(`/api/agents?companyId=${companyId}`)
      .then((r) => r.json())
      .then(({ agents }) => { setAgents(agents || []); setLoading(false); });
  }, [companyId]);

  async function toggleStatus(agent: any) {
    const newStatus = agent.status === "active" ? "paused" : "active";
    await fetch(`/api/agents/${agent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setAgents((prev) => prev.map((a) => (a.id === agent.id ? { ...a, status: newStatus } : a)));
  }

  async function deleteAgent(id: string) {
    if (!confirm("Agent wirklich löschen?")) return;
    await fetch(`/api/agents/${id}`, { method: "DELETE" });
    setAgents((prev) => prev.filter((a) => a.id !== id));
  }

  if (loading) return <div className="text-gray-400">Lädt...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dein Team</h1>
        <Link
          href="/dashboard/team/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#000088] text-white rounded-lg text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Neuer Agent
        </Link>
      </div>

      {agents.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <p className="text-gray-500 mb-4">Noch keine Agents. Starte mit deinem ersten.</p>
          <Link href="/dashboard/team/new" className="text-[#000088] font-medium">
            Agent erstellen →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: agent.accent_color || "#3739C1" }}
                  >
                    {agent.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{agent.name}</div>
                    <div className="text-sm text-gray-500">{agent.role}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  agent.status === "active" ? "bg-green-100 text-green-700"
                  : agent.status === "paused" ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-500"
                }`}>
                  {agent.status}
                </span>
              </div>

              {agent.focus && (
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{agent.focus}</p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <span>{TYPE_LABELS[agent.type] || agent.type}</span>
                <span>{agent.completed_tasks || 0} Tasks erledigt</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(agent)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50"
                >
                  {agent.status === "active" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  {agent.status === "active" ? "Pausieren" : "Aktivieren"}
                </button>
                <button
                  onClick={() => deleteAgent(agent.id)}
                  className="px-3 py-1.5 text-xs border rounded-lg hover:bg-red-50 text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create new agent page**

```tsx
// apps/web/app/dashboard/team/new/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCompany } from "../../layout";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const AGENT_TYPES = [
  { id: "claude", name: "Claude (Anthropic)", desc: "Bestes Reasoning, Swiss-Deutsch" },
  { id: "gpt", name: "GPT (OpenAI)", desc: "Vielseitig, schnell" },
  { id: "mistral", name: "Mistral (EU)", desc: "EU-hosted, GDPR-nativ" },
  { id: "custom", name: "Custom", desc: "Eigener Endpoint" },
];

const COLORS = ["#3739C1", "#000088", "#059669", "#D97706", "#DC2626", "#7C3AED", "#0891B2"];

export default function NewAgentPage() {
  const router = useRouter();
  const { companyId } = useCompany();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [type, setType] = useState("claude");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [accentColor, setAccentColor] = useState("#3739C1");

  async function handleCreate() {
    if (!companyId || !name || !role) return;
    setLoading(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId,
          name,
          role,
          type,
          systemPrompt: systemPrompt || null,
          accentColor,
        }),
      });
      if (res.ok) router.push("/dashboard/team");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <Link href="/dashboard/team" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-gray-700">
        <ArrowLeft className="w-4 h-4" /> Zurück zum Team
      </Link>

      <h1 className="text-2xl font-bold mb-6">Neuer Agent</h1>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. Max, Aura, Luna..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000088]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Rolle</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="z.B. Sales Manager, Content Creator, CFO..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000088]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">AI Modell</label>
          <div className="grid grid-cols-2 gap-2">
            {AGENT_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`text-left px-3 py-2.5 rounded-lg border-2 transition text-sm ${
                  type === t.id ? "border-[#000088] bg-blue-50" : "border-gray-200"
                }`}
              >
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-gray-500">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Farbe</label>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setAccentColor(c)}
                className={`w-8 h-8 rounded-full border-2 ${accentColor === c ? "border-gray-800" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">System Prompt (optional)</label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Beschreibe wie sich der Agent verhalten soll..."
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000088] text-sm"
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={!name || !role || loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#000088] text-white rounded-lg font-medium disabled:opacity-40"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Agent erstellen"}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/dashboard/team/
git commit -m "feat(team): agent list, create, pause, delete with real DB"
```

---

### Task 10: Connectors Page (UI + Backend)

**Files:**
- Create: `apps/web/app/dashboard/connectors/page.tsx`

- [ ] **Step 1: Create connectors management page**

```tsx
// apps/web/app/dashboard/connectors/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useCompany } from "../layout";
import { Key, Eye, EyeOff, CheckCircle2, XCircle, Loader2, Trash2, TestTube } from "lucide-react";

const PROVIDERS = [
  { id: "anthropic", name: "Anthropic (Claude)", category: "LLM", placeholder: "sk-ant-..." },
  { id: "openai", name: "OpenAI (GPT)", category: "LLM", placeholder: "sk-..." },
  { id: "mistral", name: "Mistral", category: "LLM", placeholder: "..." },
  { id: "deepl", name: "DeepL", category: "Swiss", placeholder: "..." },
  { id: "bexio", name: "Bexio", category: "Swiss", placeholder: "OAuth (coming soon)", disabled: true },
  { id: "github", name: "GitHub", category: "Dev", placeholder: "ghp_..." },
  { id: "notion", name: "Notion", category: "Productivity", placeholder: "secret_..." },
];

export default function ConnectorsPage() {
  const { companyId } = useCompany();
  const [connectors, setConnectors] = useState<any[]>([]);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [keyInputs, setKeyInputs] = useState<Record<string, string>>({});
  const [testing, setTesting] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/connectors").then((r) => r.json()).then(({ connectors }) => setConnectors(connectors || []));
  }, []);

  function getConnector(providerId: string) {
    return connectors.find((c) => c.provider === providerId);
  }

  async function saveKey(providerId: string) {
    if (!companyId || !keyInputs[providerId]) return;
    setSaving(providerId);
    try {
      const res = await fetch("/api/connectors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, provider: providerId, value: keyInputs[providerId] }),
      });
      const { connector } = await res.json();
      setConnectors((prev) => [...prev.filter((c) => c.provider !== providerId), connector]);
      setKeyInputs((prev) => ({ ...prev, [providerId]: "" }));
    } finally {
      setSaving(null);
    }
  }

  async function testConnector(connectorId: string, providerId: string) {
    setTesting(providerId);
    try {
      const res = await fetch(`/api/connectors/${connectorId}/test`, { method: "POST" });
      const result = await res.json();
      setConnectors((prev) =>
        prev.map((c) => (c.id === connectorId ? { ...c, last_test_result: result.success ? "success" : "failed" } : c)),
      );
    } finally {
      setTesting(null);
    }
  }

  async function removeConnector(connectorId: string, providerId: string) {
    if (!confirm("Verbindung wirklich entfernen?")) return;
    await fetch(`/api/connectors?id=${connectorId}`, { method: "DELETE" });
    setConnectors((prev) => prev.filter((c) => c.id !== connectorId));
  }

  const categories = [...new Set(PROVIDERS.map((p) => p.category))];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Connectors</h1>
      <p className="text-gray-500 mb-6">Verbinde deine APIs. Deine Keys, deine Daten.</p>

      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">{cat}</h2>
          <div className="space-y-3">
            {PROVIDERS.filter((p) => p.category === cat).map((provider) => {
              const connected = getConnector(provider.id);
              return (
                <div key={provider.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Key className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{provider.name}</span>
                    </div>
                    {connected ? (
                      <div className="flex items-center gap-2">
                        {connected.last_test_result === "success" ? (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle2 className="w-3 h-3" /> Verbunden
                          </span>
                        ) : connected.last_test_result === "failed" ? (
                          <span className="flex items-center gap-1 text-xs text-red-500">
                            <XCircle className="w-3 h-3" /> Fehler
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Nicht getestet</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Nicht verbunden</span>
                    )}
                  </div>

                  {connected ? (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => testConnector(connected.id, provider.id)}
                        disabled={testing === provider.id}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50"
                      >
                        {testing === provider.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <TestTube className="w-3 h-3" />}
                        Testen
                      </button>
                      <button
                        onClick={() => removeConnector(connected.id, provider.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-lg hover:bg-red-50 text-red-500"
                      >
                        <Trash2 className="w-3 h-3" /> Entfernen
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 mt-2">
                      <div className="relative flex-1">
                        <input
                          type={showKey[provider.id] ? "text" : "password"}
                          value={keyInputs[provider.id] || ""}
                          onChange={(e) => setKeyInputs((prev) => ({ ...prev, [provider.id]: e.target.value }))}
                          placeholder={provider.placeholder}
                          disabled={provider.disabled}
                          className="w-full px-3 py-1.5 pr-8 border rounded-lg text-sm font-mono focus:outline-none focus:border-[#000088] disabled:bg-gray-50 disabled:text-gray-400"
                        />
                        <button
                          onClick={() => setShowKey((prev) => ({ ...prev, [provider.id]: !prev[provider.id] }))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                          {showKey[provider.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <button
                        onClick={() => saveKey(provider.id)}
                        disabled={!keyInputs[provider.id] || saving === provider.id || provider.disabled}
                        className="px-4 py-1.5 bg-[#000088] text-white text-xs rounded-lg font-medium disabled:opacity-40"
                      >
                        {saving === provider.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Speichern"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/web/app/dashboard/connectors/
git commit -m "feat(connectors): encrypted key management UI with test buttons"
```

---

### Task 11: Remaining Dashboard Pages (Aufgaben, Ziele, Aktivität, Finanzen, Einstellungen)

**Files:**
- Create: `apps/web/app/dashboard/aufgaben/page.tsx`
- Create: `apps/web/app/dashboard/ziele/page.tsx`
- Create: `apps/web/app/dashboard/aktivitaet/page.tsx`
- Create: `apps/web/app/dashboard/finanzen/page.tsx`
- Create: `apps/web/app/dashboard/einstellungen/page.tsx`

These pages follow the same pattern as the team page — fetch data from API, render with real data. Each one queries its respective API endpoint with companyId.

- [ ] **Step 1: Create Aufgaben (Tasks) page** — Task board with status columns (todo, in-progress, review, done), create task form, assign to agent, priority colors. Fetch from `/api/tasks?companyId=`.

- [ ] **Step 2: Create Ziele (Goals) page** — Goal cards with progress bars, owner agent, deadline. Fetch from `/api/goals?companyId=`.

- [ ] **Step 3: Create Aktivität (Activity) page** — Chronological activity feed. Fetch from `/api/activity?companyId=`.

- [ ] **Step 4: Create Finanzen (Budget) page** — Budget overview per agent, cost entries list. Fetch from `/api/costs?companyId=`.

- [ ] **Step 5: Create Einstellungen (Settings) page** — Company name edit, locale, timezone, delete company.

- [ ] **Step 6: Commit all dashboard pages**

```bash
git add apps/web/app/dashboard/aufgaben/ apps/web/app/dashboard/ziele/ apps/web/app/dashboard/aktivitaet/ apps/web/app/dashboard/finanzen/ apps/web/app/dashboard/einstellungen/
git commit -m "feat(dashboard): add aufgaben, ziele, aktivitaet, finanzen, einstellungen pages"
```

---

### Task 12: RLS Policies for Supabase

**Files:**
- SQL execution on Supabase

- [ ] **Step 1: Create RLS policies**

All tables need Row Level Security so users can only access their own company's data. Since we store `owner_id` in `companies.settings`, we need a helper function:

```sql
-- Helper: Check if current user owns the company
CREATE OR REPLACE FUNCTION public.user_owns_company(company_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.companies
    WHERE id = company_uuid
    AND (settings->>'owner_id')::UUID = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Companies: user can only see their own
CREATE POLICY "Users can view own companies" ON public.companies
  FOR SELECT USING ((settings->>'owner_id')::UUID = auth.uid());
CREATE POLICY "Users can insert companies" ON public.companies
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own companies" ON public.companies
  FOR UPDATE USING ((settings->>'owner_id')::UUID = auth.uid());
CREATE POLICY "Users can delete own companies" ON public.companies
  FOR DELETE USING ((settings->>'owner_id')::UUID = auth.uid());

-- Agents: scoped to company ownership
CREATE POLICY "Company agents select" ON public.agents
  FOR SELECT USING (public.user_owns_company(company_id));
CREATE POLICY "Company agents insert" ON public.agents
  FOR INSERT WITH CHECK (public.user_owns_company(company_id));
CREATE POLICY "Company agents update" ON public.agents
  FOR UPDATE USING (public.user_owns_company(company_id));
CREATE POLICY "Company agents delete" ON public.agents
  FOR DELETE USING (public.user_owns_company(company_id));

-- Apply same pattern to: tasks, goals, budgets, cost_entries, decisions, sprints,
-- playbooks, heartbeats, heartbeat_runs, meeting_messages, audit_trail,
-- connector_credentials, activity_log
```

Repeat the 4-policy pattern (SELECT/INSERT/UPDATE/DELETE) for every table that has a `company_id` column.

Special cases:
- `connector_credentials`: Also check `user_id = auth.uid()` for extra security
- `kader_templates`: Public read for published templates, admin-only write
- `departments`, `task_comments`: Via company_id FK chain

- [ ] **Step 2: Execute on Supabase**

```bash
PGPASSWORD="h5zIfnknPlnTK50R" psql -h db.oxxfmimytrmvbkvhttvl.supabase.co -p 5432 -U postgres -d postgres < rls_policies.sql
```

- [ ] **Step 3: Test RLS by querying as authenticated user**

Verify that unauthenticated requests return empty results and authenticated users only see their own data.

- [ ] **Step 4: Commit migration file**

```bash
git add packages/db/migrations/
git commit -m "feat(db): add RLS policies for all tables"
```

---

### Task 13: Generate Master Key + Update Env

- [ ] **Step 1: Generate KADEROS_MASTER_KEY**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

- [ ] **Step 2: Add to .env.local files**

Add `KADEROS_MASTER_KEY=<value>` to:
- `apps/web/.env.local`
- Root `.env.local`

- [ ] **Step 3: Add to Vercel environment variables**

```bash
# Via Vercel dashboard or CLI
vercel env add KADEROS_MASTER_KEY production
```

- [ ] **Step 4: Add .env.example with placeholder**

```bash
echo "KADEROS_MASTER_KEY=generate-with-node-e-require-crypto-randomBytes-32-toString-base64" >> apps/web/.env.example
```

- [ ] **Step 5: Commit .env.example**

```bash
git add apps/web/.env.example
git commit -m "chore: add .env.example with KADEROS_MASTER_KEY placeholder"
```

---

## Execution Order Summary

| # | Task | Dependencies | Parallel? |
|---|------|-------------|-----------|
| 1 | DB Migration (connector_credentials + activity_log) | None | — |
| 2 | Encryption Library | None | Yes, with 1 |
| 3 | Activity Logging Helper | 1 | — |
| 4 | Company API + Onboarding | 1, 3 | — |
| 5 | Connector API | 1, 2 | — |
| 6 | Refactor Agent API | 3 | Yes, with 5 |
| 7 | Task & Goal API Routes | 3 | Yes, with 5, 6 |
| 8 | Dashboard Layout + Overview | 4, 6 | — |
| 9 | Team Page | 6, 8 | — |
| 10 | Connectors Page | 5, 8 | Yes, with 9 |
| 11 | Remaining Dashboard Pages | 7, 8 | — |
| 12 | RLS Policies | 1 | Yes, with anything |
| 13 | Master Key + Env | 2 | Anytime |

**Parallelisierbar:** Tasks 1+2, Tasks 5+6+7, Tasks 9+10, Task 12 (independent)

---

*Erstellt: 3. April 2026*
*Phase: 0 — Foundation*
*Geschätzt: 13 Tasks, ~2-3 Tage mit Sub-Agents*
