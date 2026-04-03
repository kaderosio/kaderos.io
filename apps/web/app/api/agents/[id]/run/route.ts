import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getAdapter } from "@/lib/adapters/registry";
import { decrypt } from "@/lib/crypto";
import { logActivity } from "@/lib/activity";
import { randomUUID } from "crypto";

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
  const { prompt } = body;
  if (!prompt) return NextResponse.json({ error: "prompt required" }, { status: 400 });

  // 1. Get agent
  const { data: agent, error: agentError } = await supabase
    .from("agents").select("*").eq("id", id).single();
  if (agentError || !agent) return NextResponse.json({ error: "Agent not found" }, { status: 404 });

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
    .select("id")
    .eq("agent_id", id)
    .eq("company_id", agent.company_id)
    .single();

  if (!heartbeat) {
    const { data: newHb } = await supabase
      .from("heartbeats")
      .insert({ company_id: agent.company_id, agent_id: id, is_enabled: true, status: "scheduled" })
      .select("id")
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
      run_count: (agent.run_count || 0) + 1,
    }).eq("id", heartbeat.id);
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

  // 7. Update agent task counters
  if (result.success) {
    await supabase.from("agents").update({
      completed_tasks: (agent.completed_tasks || 0) + 1,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
  }

  // 8. Log activity
  await logActivity({
    companyId: agent.company_id,
    actorType: "agent",
    actorId: id,
    action: result.success ? "agent_run_completed" : "agent_run_failed",
    entityType: "heartbeat_run",
    entityId: runId,
    agentId: id,
    details: {
      model: result.usage?.model,
      tokens: result.usage ? result.usage.inputTokens + result.usage.outputTokens : 0,
      costUsd: result.costUsd,
      error: result.error,
    },
  });

  // 9. Return result
  return NextResponse.json({
    runId,
    success: result.success,
    output: result.output,
    error: result.error,
    usage: result.usage,
    costUsd: result.costUsd,
  });
}
