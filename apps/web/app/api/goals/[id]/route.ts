import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
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

  const body = await req.json();

  const allowedFields: Record<string, string> = {
    title: "title",
    description: "description",
    ownerAgentId: "owner_agent_id",
    deadline: "deadline",
    progress: "progress",
    status: "status",
    department: "department",
  };

  const updates: Record<string, unknown> = {};
  for (const [camel, snake] of Object.entries(allowedFields)) {
    if (body[camel] !== undefined) {
      updates[snake] = body[camel];
    }
  }

  // Auto-sync progress and status
  if (updates.progress === 100) {
    updates.status = "completed";
  }
  if (updates.status === "completed") {
    updates.progress = 100;
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("goals")
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
    action: "updated_goal",
    entityType: "goal",
    entityId: id,
    agentId: data.owner_agent_id || undefined,
    details: { updatedFields: Object.keys(updates).filter((k) => k !== "updated_at") },
  });

  return NextResponse.json({ goal: data });
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

  const { error } = await supabase
    .from("goals")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
