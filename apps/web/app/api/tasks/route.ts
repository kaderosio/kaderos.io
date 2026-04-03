import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const companyId = req.nextUrl.searchParams.get("companyId");

  if (!companyId) {
    return NextResponse.json(
      { error: "companyId is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("*, agents(name, accent_color)")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ tasks: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { companyId, title, description, priority, agentId, dueDate, goalId } = body;

  if (!companyId || !title) {
    return NextResponse.json(
      { error: "companyId and title are required" },
      { status: 400 }
    );
  }

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

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logActivity({
    companyId,
    actorType: "user",
    actorId: user.id,
    action: "created_task",
    entityType: "task",
    entityId: data.id,
    agentId: agentId || undefined,
    details: { title, priority: priority || "medium" },
  });

  return NextResponse.json({ task: data }, { status: 201 });
}
