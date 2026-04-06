import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getAdapter } from "@/lib/adapters/registry";
import { decrypt } from "@/lib/crypto";
import { logActivity } from "@/lib/activity";
import { verifyCompanyOwnership } from "@/lib/auth";
import { randomUUID } from "crypto";
import { checkBudget, recordCost, USD_TO_CHF } from "@/lib/budget";

const PROVIDER_MAP: Record<string, string> = {
  claude: "anthropic",
  gpt: "openai",
  mistral: "mistral",
};

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { prompt: bodyPrompt, taskId } = body;

  // Load task if taskId provided
  let task: Record<string, any> | null = null;
  if (taskId) {
    const { data: taskData, error: taskError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .single();
    if (taskError || !taskData) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    task = taskData;
  }

  // Determine prompt: task-based or body-based
  const prompt = task
    ? `Aufgabe: ${task.title}\n\nBeschreibung: ${task.description || ""}`
    : bodyPrompt;

  if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

  // 1. Get agent
  const { data: agent, error: agentError } = await supabase
    .from("agents").select("*").eq("id", id).single();
  if (agentError || !agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });

  // Verify company ownership
  if (!(await verifyCompanyOwnership(supabase, agent.company_id, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 1b. Budget check
  const budgetCheck = await checkBudget(supabase, id, agent.company_id);
  if (!budgetCheck.allowed) {
    return NextResponse.json(
      { error: "Budget aufgebraucht. Agent pausiert." },
      { status: 429 }
    );
  }

  // 2. Get adapter
  const adapter = getAdapter(agent.type);
  if (!adapter) return NextResponse.json({ error: `No adapter for type: ${agent.type}` }, { status: 400 });

  // 3. Get API key
  const provider = PROVIDER_MAP[agent.type] || agent.type;
  const { data: credential } = await supabase
    .from("connector_credentials")
    .select("*")
    .eq("company_id", agent.company_id)
    .eq("provider", provider)
    .eq("user_id", user.id)
    .single();

  if (!credential) {
    return NextResponse.json({
      error: `Kein API Key für ${provider} gefunden. Bitte unter Connectors verbinden.`
    }, { status: 400 });
  }

  const apiKey = decrypt(credential.encrypted_value);

  // 4. Create heartbeat run
  const runId = randomUUID();

  // First get or create heartbeat for this agent
  let { data: heartbeat } = await supabase
    .from("heartbeats")
    .select("id, run_count")
    .eq("agent_id", id)
    .eq("company_id", agent.company_id)
    .single();

  if (!heartbeat) {
    const { data: newHb } = await supabase
      .from("heartbeats")
      .insert({ company_id: agent.company_id, agent_id: id, is_enabled: true, status: "scheduled" })
      .select("id, run_count")
      .single();
    heartbeat = newHb;
  }

  if (heartbeat) {
    await supabase.from("heartbeat_runs").insert({
      id: runId,
      heartbeat_id: heartbeat.id,
      agent_id: id,
      status: "running",
    });

    await supabase.from("heartbeats").update({
      last_run_at: new Date().toISOString(),
      status: "running",
      run_count: (heartbeat.run_count || 0) + 1,
    }).eq("id", heartbeat.id);
  }

  // If task, mark as in-progress
  if (task) {
    await supabase.from("tasks").update({
      status: "in-progress",
      updated_at: new Date().toISOString(),
    }).eq("id", taskId);
  }

  // 5. Execute adapter
  const result = await adapter.execute({
    runId,
    agent: {
      id: agent.id,
      name: agent.name,
      role: agent.role,
      systemPrompt: agent.system_prompt,
      config: agent.config || {},
    },
    prompt,
    apiKey,
  });

  // 6. Update heartbeat run
  if (heartbeat) {
    await supabase.from("heartbeat_runs").update({
      status: result.success ? "completed" : "failed",
      completed_at: new Date().toISOString(),
      tokens_used: result.usage ? result.usage.inputTokens + result.usage.outputTokens : null,
      output: { text: result.output, usage: result.usage },
      error: result.error || null,
    }).eq("id", runId);

    await supabase.from("heartbeats").update({
      status: result.success ? "completed" : "failed",
      last_result: { success: result.success, output: result.output?.substring(0, 500), usage: result.usage },
    }).eq("id", heartbeat.id);
  }

  // 7. Task lifecycle updates
  if (task) {
    if (result.success) {
      // Mark task as done
      await supabase.from("tasks").update({
        status: "done",
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }).eq("id", taskId);

      // Update agent counters (re-fetch to avoid stale read)
      const { data: freshAgent } = await supabase
        .from("agents").select("completed_tasks, open_tasks").eq("id", id).single();
      if (freshAgent) {
        await supabase.from("agents").update({
          completed_tasks: (freshAgent.completed_tasks || 0) + 1,
          open_tasks: Math.max((freshAgent.open_tasks || 0) - 1, 0),
          updated_at: new Date().toISOString(),
        }).eq("id", id);
      }

      // Save agent output as system comment
      await supabase.from("task_comments").insert({
        task_id: taskId,
        agent_id: id,
        content: result.output,
        is_system: true,
        company_id: agent.company_id,
      });

      // Recalculate goal progress if task has goal_id
      if (task.goal_id) {
        await recalculateGoalProgress(supabase, task.goal_id);
      }
    } else {
      // Mark task as blocked
      await supabase.from("tasks").update({
        status: "blocked",
        updated_at: new Date().toISOString(),
      }).eq("id", taskId);

      // Save error as system comment
      await supabase.from("task_comments").insert({
        task_id: taskId,
        agent_id: id,
        content: result.error || "Agent run failed",
        is_system: true,
        company_id: agent.company_id,
      });
    }
  } else {
    // Original behavior: update agent completed_tasks only on success (no task context)
    if (result.success) {
      const { data: freshAgent2 } = await supabase
        .from("agents").select("completed_tasks").eq("id", id).single();
      await supabase.from("agents").update({
        completed_tasks: (freshAgent2?.completed_tasks || 0) + 1,
        updated_at: new Date().toISOString(),
      }).eq("id", id);
    }
  }

  // 8. Cost tracking (record regardless of budget existence for visibility)
  if (result.costUsd) {
    await recordCost(supabase, {
      budgetId: budgetCheck.budget?.id ?? null,
      agentId: id,
      taskId: taskId || undefined,
      amountChf: result.costUsd * USD_TO_CHF,
      tokensUsed: result.usage ? result.usage.inputTokens + result.usage.outputTokens : 0,
      model: result.usage?.model || agent.type,
    });
  }

  // 9. Log activity
  await logActivity({
    companyId: agent.company_id,
    actorType: "agent",
    actorId: id,
    action: task
      ? (result.success ? "task_auto_completed" : "task_auto_failed")
      : (result.success ? "agent_run_completed" : "agent_run_failed"),
    entityType: task ? "task" : "heartbeat_run",
    entityId: task ? taskId : runId,
    agentId: id,
    details: {
      model: result.usage?.model,
      tokens: result.usage ? result.usage.inputTokens + result.usage.outputTokens : 0,
      costUsd: result.costUsd,
      error: result.error,
      taskId: taskId || undefined,
    },
  });

  // 10. Return result
  return NextResponse.json({
    runId,
    success: result.success,
    output: result.output,
    error: result.error,
    usage: result.usage,
    costUsd: result.costUsd,
    taskId: taskId || undefined,
  });
}

/** Recalculate goal progress based on done tasks / total tasks */
async function recalculateGoalProgress(supabase: any, goalId: string) {
  const { count: totalCount } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("goal_id", goalId);

  const { count: doneCount } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("goal_id", goalId)
    .eq("status", "done");

  if (totalCount && totalCount > 0) {
    const progress = Math.round(((doneCount || 0) / totalCount) * 100);
    const updates: Record<string, any> = {
      progress,
      updated_at: new Date().toISOString(),
    };
    if (progress >= 100) {
      updates.status = "completed";
    }
    await supabase.from("goals").update(updates).eq("id", goalId);
  }
}
