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
  const { status, reason } = body;

  if (!status || !["approved", "denied"].includes(status)) {
    return NextResponse.json(
      { error: "status must be 'approved' or 'denied'" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("decisions")
    .update({
      status,
      reason: reason || null,
      decided_by: user.id,
      decided_at: new Date().toISOString(),
    })
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
    action: "decision_reviewed",
    entityType: "decision",
    entityId: id,
    agentId: data.agent_id || undefined,
    details: { status, reason },
  });

  return NextResponse.json({ decision: data });
}
