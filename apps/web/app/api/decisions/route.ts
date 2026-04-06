import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { verifyCompanyOwnership } from "@/lib/auth";
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

  const status = req.nextUrl.searchParams.get("status");

  let query = supabase
    .from("decisions")
    .select("*, agents:agent_id(name, accent_color)")
    .eq("company_id", companyId)
    .order("requested_at", { ascending: false });

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ decisions: data });
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
  const { companyId, agentId, request, type, confidence, status, reason } = body;

  if (!companyId || !agentId || !request || confidence === undefined) {
    return NextResponse.json(
      { error: "companyId, agentId, request, and confidence are required" },
      { status: 400 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const autoApproved = confidence >= 80;
  const resolvedStatus = status || (autoApproved ? "approved" : "pending");

  const { data, error } = await supabase
    .from("decisions")
    .insert({
      company_id: companyId,
      agent_id: agentId,
      request,
      type: type || "other",
      confidence,
      status: resolvedStatus,
      decided_by: resolvedStatus === "approved" ? "system" : null,
      decided_at: resolvedStatus === "approved" ? new Date().toISOString() : null,
      reason: reason || null,
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
    action: autoApproved ? "decision_auto_approved" : "decision_created",
    entityType: "decision",
    entityId: data.id,
    agentId,
    details: { request, type: type || "other", confidence },
  });

  return NextResponse.json({ decision: data }, { status: 201 });
}
