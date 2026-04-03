import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
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
    name: "name",
    role: "role",
    type: "type",
    status: "status",
    systemPrompt: "system_prompt",
    jobDescription: "job_description",
    config: "config",
    skills: "skills",
    focus: "focus",
    accentColor: "accent_color",
    departmentId: "department_id",
  };

  const updates: Record<string, unknown> = {};
  for (const [camel, snake] of Object.entries(allowedFields)) {
    if (body[camel] !== undefined) {
      updates[snake] = body[camel];
    }
  }

  updates.updated_at = new Date().toISOString();

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
    action: "updated_agent",
    entityType: "agent",
    entityId: id,
    agentId: id,
    details: { updatedFields: Object.keys(updates).filter((k) => k !== "updated_at") },
  });

  return NextResponse.json({ agent: data });
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

  // Fetch agent first to get name and company_id for logging
  const { data: agent } = await supabase
    .from("agents")
    .select("name, company_id")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("agents")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (agent) {
    await logActivity({
      companyId: agent.company_id,
      actorType: "user",
      actorId: user.id,
      action: "deleted_agent",
      entityType: "agent",
      entityId: id,
      details: { name: agent.name },
    });
  }

  return NextResponse.json({ success: true });
}
