import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
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

  const { id } = await params;
  const body = await req.json();
  const { monthlyLimitChf, warningThreshold, isPaused } = body;

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (monthlyLimitChf != null) updates.monthly_limit_chf = monthlyLimitChf;
  if (warningThreshold != null) updates.warning_threshold = warningThreshold;
  if (isPaused != null) updates.is_paused = isPaused;

  const { data, error } = await supabase
    .from("budgets")
    .update(updates)
    .eq("id", id)
    .select("*, agents:agent_id(id, name)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Budget not found" }, { status: 404 });
  }

  await logActivity({
    companyId: data.company_id,
    actorType: "user",
    actorId: user.id,
    action: "updated_budget",
    entityType: "budget",
    entityId: data.id,
    details: { monthlyLimitChf, warningThreshold, isPaused },
  });

  return NextResponse.json({ budget: data });
}
