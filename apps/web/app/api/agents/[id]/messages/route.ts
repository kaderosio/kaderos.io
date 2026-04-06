import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { verifyCompanyOwnership } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id: agentId } = await params;

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

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limit = parseInt(
    req.nextUrl.searchParams.get("limit") || "50",
    10
  );

  const { data, error } = await supabase
    .from("meeting_messages")
    .select("*")
    .eq("agent_id", agentId)
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ messages: data });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id: agentId } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { companyId, content, targetAgentId, sessionId } = body;

  if (!companyId || !content) {
    return NextResponse.json(
      { error: "companyId and content are required" },
      { status: 400 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("meeting_messages")
    .insert({
      company_id: companyId,
      agent_id: agentId,
      role: "agent",
      content,
      session_id: sessionId || `delegation-${Date.now()}`,
      metadata: { targetAgentId: targetAgentId || null },
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logActivity({
    companyId,
    actorType: "agent",
    actorId: agentId,
    action: "agent_message_sent",
    entityType: "message",
    entityId: data.id,
    agentId,
    details: { targetAgentId: targetAgentId || null },
  });

  return NextResponse.json({ message: data }, { status: 201 });
}
