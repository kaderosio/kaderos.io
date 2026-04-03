import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { templates } from "@/lib/templates";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: companyId } = await params;
  const body = await req.json();
  const { templateId } = body;

  if (!templateId) {
    return NextResponse.json(
      { error: "templateId is required" },
      { status: 400 }
    );
  }

  const template = templates.find((t) => t.id === templateId);

  if (!template) {
    return NextResponse.json(
      { error: "Template not found" },
      { status: 404 }
    );
  }

  /* ── Insert agents ───────────────────────────────────────────────── */

  const agentRows = template.agents.map((a) => ({
    company_id: companyId,
    name: a.name,
    role: a.role,
    type: a.type,
    status: "active",
    system_prompt: a.systemPrompt,
    config: {},
    skills: [],
    focus: a.focus,
    accent_color: a.accentColor,
  }));

  const { data: agents, error: agentsError } = await supabase
    .from("agents")
    .insert(agentRows)
    .select();

  if (agentsError) {
    return NextResponse.json(
      { error: agentsError.message },
      { status: 500 }
    );
  }

  /* ── Log activity for each agent ─────────────────────────────────── */

  for (const agent of agents) {
    await logActivity({
      companyId,
      actorType: "system",
      actorId: "template-import",
      action: "created_agent",
      entityType: "agent",
      entityId: agent.id,
      agentId: agent.id,
      details: {
        name: agent.name,
        role: agent.role,
        templateId: template.id,
      },
    });
  }

  /* ── Insert goals ────────────────────────────────────────────────── */

  const goalRows = template.goals.map((g) => ({
    company_id: companyId,
    title: g.title,
    description: g.description,
    status: "on-track",
    progress: 0,
  }));

  const { data: goals, error: goalsError } = await supabase
    .from("goals")
    .insert(goalRows)
    .select();

  if (goalsError) {
    return NextResponse.json(
      { error: goalsError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    agentsCreated: agents.length,
    goalsCreated: goals.length,
  });
}
