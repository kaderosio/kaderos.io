import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id: sourceAgentId } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { targetAgentId, title, description, priority, goalId } = body;

  if (!targetAgentId || !title) {
    return NextResponse.json(
      { error: "targetAgentId and title are required" },
      { status: 400 }
    );
  }

  if (sourceAgentId === targetAgentId) {
    return NextResponse.json(
      { error: "An agent cannot delegate to itself" },
      { status: 400 }
    );
  }

  // Validate source agent
  const { data: sourceAgent, error: sourceError } = await supabase
    .from("agents")
    .select("id, name, company_id")
    .eq("id", sourceAgentId)
    .single();

  if (sourceError || !sourceAgent) {
    return NextResponse.json(
      { error: "Source agent not found" },
      { status: 404 }
    );
  }

  // Validate target agent
  const { data: targetAgent, error: targetError } = await supabase
    .from("agents")
    .select("id, name, company_id")
    .eq("id", targetAgentId)
    .single();

  if (targetError || !targetAgent) {
    return NextResponse.json(
      { error: "Target agent not found" },
      { status: 404 }
    );
  }

  // Both agents must belong to the same company
  if (sourceAgent.company_id !== targetAgent.company_id) {
    return NextResponse.json(
      { error: "Agents must belong to the same company" },
      { status: 400 }
    );
  }

  // Create the delegated task
  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .insert({
      company_id: sourceAgent.company_id,
      agent_id: targetAgentId,
      title,
      description: description || null,
      priority: priority || "medium",
      status: "todo",
      goal_id: goalId || null,
    })
    .select()
    .single();

  if (taskError) {
    return NextResponse.json({ error: taskError.message }, { status: 500 });
  }

  // Create a decision record for the delegation
  const { error: decisionError } = await supabase
    .from("decisions")
    .insert({
      company_id: sourceAgent.company_id,
      agent_id: sourceAgentId,
      request: `Delegiert an ${targetAgent.name}: ${title}`,
      type: "other",
      confidence: 85,
      status: "approved",
      decided_by: "system",
      decided_at: new Date().toISOString(),
    });

  if (decisionError) {
    console.error("Failed to create delegation decision:", decisionError);
  }

  // Log the delegation activity
  await logActivity({
    companyId: sourceAgent.company_id,
    actorType: "agent",
    actorId: sourceAgentId,
    action: "task_delegated",
    entityType: "task",
    entityId: task.id,
    agentId: sourceAgentId,
    details: {
      from: sourceAgent.name,
      to: targetAgent.name,
      title,
    },
  });

  return NextResponse.json(
    {
      task,
      delegation: {
        from: sourceAgent.name,
        to: targetAgent.name,
      },
    },
    { status: 201 }
  );
}
