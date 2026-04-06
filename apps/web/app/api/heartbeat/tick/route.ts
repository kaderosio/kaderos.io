import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAdapter } from "@/lib/adapters/registry";
import { decrypt } from "@/lib/crypto";
import { checkBudget, recordCost, USD_TO_CHF } from "@/lib/budget";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const maxDuration = 300;

const PROVIDER_MAP: Record<string, string> = {
  claude: "anthropic",
  gpt: "openai",
  mistral: "mistral",
  deepl: "deepl",
};

function calculateNextRun(cronExpression: string): Date {
  const parts = (cronExpression || "0 * * * *").trim().split(/\s+/);
  const now = new Date();
  const next = new Date(now);

  if (parts.length === 5) {
    const minute = parseInt(parts[0], 10);
    const hour = parts[1];

    if (isNaN(minute)) {
      // Wildcard minute (e.g. */15) — fallback to next full hour
      next.setHours(next.getHours() + 1);
      next.setMinutes(0, 0, 0);
    } else if (hour === "*") {
      next.setMinutes(minute, 0, 0);
      if (next <= now) {
        next.setHours(next.getHours() + 1);
      }
    } else {
      const h = parseInt(hour, 10);
      if (isNaN(h)) {
        next.setHours(next.getHours() + 1);
        next.setMinutes(0, 0, 0);
      } else {
        next.setHours(h, minute, 0, 0);
        if (next <= now) {
          next.setDate(next.getDate() + 1);
        }
      }
    }
  } else {
    next.setHours(next.getHours() + 1);
    next.setMinutes(0, 0, 0);
  }

  return next;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function logActivityWithClient(
  supabase: any,
  input: {
    companyId: string;
    actorType: "user" | "agent" | "system";
    actorId: string;
    action: string;
    entityType: string;
    entityId: string;
    agentId?: string;
    details?: Record<string, unknown>;
  }
) {
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

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const now = new Date().toISOString();

  const { data: heartbeats, error: hbError } = await supabase
    .from("heartbeats")
    .select("*, agents(*)")
    .eq("is_enabled", true)
    .lte("next_run_at", now);

  if (hbError) {
    console.error("Failed to load heartbeats:", hbError);
    return NextResponse.json({ error: "Failed to load heartbeats" }, { status: 500 });
  }

  const summary = {
    agents_checked: heartbeats?.length ?? 0,
    tasks_completed: 0,
    tasks_failed: 0,
    skipped_no_tasks: 0,
    skipped_budget: 0,
    errors: [] as string[],
  };

  for (const heartbeat of heartbeats ?? []) {
    const agent = heartbeat.agents;
    if (!agent) {
      summary.errors.push(`Heartbeat ${heartbeat.id}: no agent found`);
      continue;
    }

    try {
      const budgetResult = await checkBudget(supabase, agent.id, agent.company_id);

      if (!budgetResult.allowed) {
        const reason = budgetResult.budget?.is_paused ? "budget_paused" : "budget_exceeded";
        await logActivityWithClient(supabase, {
          companyId: agent.company_id,
          actorType: "system",
          actorId: "heartbeat",
          action: reason,
          entityType: "agent",
          entityId: agent.id,
          agentId: agent.id,
          details: { remaining: budgetResult.remaining },
        });
        summary.skipped_budget++;
        await updateHeartbeatNextRun(supabase, heartbeat);
        continue;
      }

      const { data: task } = await supabase
        .from("tasks")
        .select("*")
        .eq("agent_id", agent.id)
        .eq("status", "todo")
        .order("priority", { ascending: false })
        .order("created_at", { ascending: true })
        .limit(1)
        .single();

      if (!task) {
        await logActivityWithClient(supabase, {
          companyId: agent.company_id,
          actorType: "system",
          actorId: "heartbeat",
          action: "no_tasks",
          entityType: "agent",
          entityId: agent.id,
          agentId: agent.id,
        });
        summary.skipped_no_tasks++;
        await updateHeartbeatNextRun(supabase, heartbeat);
        continue;
      }

      await supabase
        .from("tasks")
        .update({ status: "in-progress", updated_at: new Date().toISOString() })
        .eq("id", task.id);

      const providerKey = PROVIDER_MAP[agent.type] || agent.type;
      const { data: credential } = await supabase
        .from("connector_credentials")
        .select("*")
        .eq("company_id", agent.company_id)
        .eq("provider", providerKey)
        .limit(1)
        .single();

      if (!credential) {
        // Config issue, not execution failure — revert task to todo so next tick retries
        await supabase
          .from("tasks")
          .update({ status: "todo", updated_at: new Date().toISOString() })
          .eq("id", task.id);

        summary.errors.push(`Agent ${agent.id}: no credentials for ${providerKey}`);
        await updateHeartbeatNextRun(supabase, heartbeat);
        continue;
      }

      const apiKey = decrypt(credential.encrypted_value);
      const adapter = getAdapter(agent.type);
      if (!adapter) {
        await supabase
          .from("tasks")
          .update({ status: "todo", updated_at: new Date().toISOString() })
          .eq("id", task.id);

        summary.errors.push(`Agent ${agent.id}: no adapter for type ${agent.type}`);
        await updateHeartbeatNextRun(supabase, heartbeat);
        continue;
      }

      const runId = randomUUID();
      const prompt = `Aufgabe: ${task.title}\n\nBeschreibung: ${task.description || "Keine weitere Beschreibung."}\n\nBitte erledige diese Aufgabe und gib eine klare Zusammenfassung deiner Arbeit.`;

      const result = await adapter.execute({
        runId,
        agent: {
          id: agent.id,
          name: agent.name,
          role: agent.role,
          systemPrompt: agent.system_prompt,
          config: agent.config ?? {},
        },
        prompt,
        apiKey,
      });

      if (result.success) {
        await supabase
          .from("tasks")
          .update({
            status: "done",
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", task.id);

        await supabase.from("task_comments").insert({
          task_id: task.id,
          agent_id: agent.id,
          content: result.output,
          is_system: true,
        });

        const { data: currentAgent } = await supabase
          .from("agents")
          .select("completed_tasks, open_tasks")
          .eq("id", agent.id)
          .single();

        if (currentAgent) {
          await supabase
            .from("agents")
            .update({
              completed_tasks: (currentAgent.completed_tasks ?? 0) + 1,
              open_tasks: Math.max(0, (currentAgent.open_tasks ?? 0) - 1),
            })
            .eq("id", agent.id);
        }

        if (result.costUsd) {
          const amountChf = result.costUsd * USD_TO_CHF;
          const tokensUsed =
            (result.usage?.inputTokens ?? 0) + (result.usage?.outputTokens ?? 0);
          await recordCost(supabase, {
            budgetId: budgetResult.budget?.id ?? null,
            agentId: agent.id,
            taskId: task.id,
            amountChf,
            tokensUsed,
            model: result.usage?.model ?? agent.provider,
          });
        }

        if (task.goal_id) {
          await updateGoalProgress(supabase, task.goal_id);
        }

        await logActivityWithClient(supabase, {
          companyId: agent.company_id,
          actorType: "agent",
          actorId: agent.id,
          action: "task_auto_completed",
          entityType: "task",
          entityId: task.id,
          agentId: agent.id,
          details: {
            task_title: task.title,
            tokens: result.usage
              ? result.usage.inputTokens + result.usage.outputTokens
              : undefined,
            cost_usd: result.costUsd,
          },
        });

        await supabase.from("decisions").insert({
          company_id: agent.company_id,
          agent_id: agent.id,
          request: `Task erledigt: ${task.title}`,
          type: "other",
          confidence: 90,
          status: "approved",
          decided_by: "system",
          reason: "Automatisch durch Heartbeat Engine ausgeführt",
        });

        summary.tasks_completed++;
      } else {
        await supabase
          .from("tasks")
          .update({ status: "blocked", updated_at: new Date().toISOString() })
          .eq("id", task.id);

        await supabase.from("task_comments").insert({
          task_id: task.id,
          agent_id: agent.id,
          content: `Fehler: ${result.error || "Unbekannter Fehler"}`,
          is_system: true,
        });

        await logActivityWithClient(supabase, {
          companyId: agent.company_id,
          actorType: "agent",
          actorId: agent.id,
          action: "task_auto_failed",
          entityType: "task",
          entityId: task.id,
          agentId: agent.id,
          details: { error: result.error, task_title: task.title },
        });

        await supabase.from("decisions").insert({
          company_id: agent.company_id,
          agent_id: agent.id,
          request: `Task fehlgeschlagen: ${task.title}`,
          type: "other",
          confidence: 30,
          status: "pending",
          decided_by: null,
          reason: result.error || "Unbekannter Fehler bei automatischer Ausführung",
        });

        summary.tasks_failed++;
      }

      await updateHeartbeatAfterRun(supabase, heartbeat, result.success);
    } catch (err: any) {
      console.error(`Heartbeat error for agent ${agent.id}:`, err);
      summary.errors.push(`Agent ${agent.id}: ${err.message}`);
      await updateHeartbeatNextRun(supabase, heartbeat);
    }
  }

  return NextResponse.json(summary);
}

async function updateHeartbeatNextRun(
  supabase: any,
  heartbeat: any
) {
  const nextRun = calculateNextRun(heartbeat.cron_expression);
  await supabase
    .from("heartbeats")
    .update({ next_run_at: nextRun.toISOString() })
    .eq("id", heartbeat.id);
}

async function updateHeartbeatAfterRun(
  supabase: any,
  heartbeat: any,
  success: boolean
) {
  const nextRun = calculateNextRun(heartbeat.cron_expression);
  await supabase
    .from("heartbeats")
    .update({
      next_run_at: nextRun.toISOString(),
      status: success ? "completed" : "failed",
      run_count: (heartbeat.run_count ?? 0) + 1,
      last_run_at: new Date().toISOString(),
    })
    .eq("id", heartbeat.id);
}

async function updateGoalProgress(
  supabase: any,
  goalId: string
) {
  const { count: total } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("goal_id", goalId);

  const { count: done } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("goal_id", goalId)
    .eq("status", "done");

  const t = total ?? 0;
  const d = done ?? 0;
  const progress = t > 0 ? Math.round((d / t) * 100) : 0;

  await supabase
    .from("goals")
    .update({ progress, updated_at: new Date().toISOString() })
    .eq("id", goalId);
}
