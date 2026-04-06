import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { verifyCompanyOwnership } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify ownership via task's company
  const { data: task } = await supabase
    .from("tasks")
    .select("company_id")
    .eq("id", id)
    .single();
  if (!task) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!(await verifyCompanyOwnership(supabase, task.company_id, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const allowedFields: Record<string, string> = {
    title: "title",
    description: "description",
    priority: "priority",
    status: "status",
    agentId: "agent_id",
    dueDate: "due_date",
    goalId: "goal_id",
  };

  const updates: Record<string, unknown> = {};
  for (const [camel, snake] of Object.entries(allowedFields)) {
    if (body[camel] !== undefined) {
      updates[snake] = body[camel];
    }
  }

  if (updates.status === "done") {
    updates.completed_at = new Date().toISOString();
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("tasks")
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
    action: "updated_task",
    entityType: "task",
    entityId: id,
    agentId: data.agent_id || undefined,
    details: { updatedFields: Object.keys(updates).filter((k) => k !== "updated_at") },
  });

  // Auto-update goal progress when task is marked done and has a goal_id
  if (data.status === "done" && data.goal_id) {
    const { count: totalCount } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("goal_id", data.goal_id);

    const { count: doneCount } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("goal_id", data.goal_id)
      .eq("status", "done");

    if (totalCount && totalCount > 0) {
      const progress = Math.round(((doneCount || 0) / totalCount) * 100);
      const goalUpdates: Record<string, unknown> = {
        progress,
        updated_at: new Date().toISOString(),
      };
      if (progress >= 100) {
        goalUpdates.status = "completed";
      }
      await supabase.from("goals").update(goalUpdates).eq("id", data.goal_id);
    }
  }

  return NextResponse.json({ task: data });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify ownership via task's company
  const { data: taskToDelete } = await supabase
    .from("tasks")
    .select("company_id")
    .eq("id", id)
    .single();
  if (!taskToDelete) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!(await verifyCompanyOwnership(supabase, taskToDelete.company_id, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
