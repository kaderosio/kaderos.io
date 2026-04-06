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
    .from("budgets")
    .select("*, agents:agent_id(id, name)")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ budgets: data });
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
  const { companyId, agentId, monthlyLimitChf, warningThreshold, period } = body;

  if (!companyId || !agentId || monthlyLimitChf == null) {
    return NextResponse.json(
      { error: "companyId, agentId, and monthlyLimitChf are required" },
      { status: 400 }
    );
  }

  const effectivePeriod = period || new Date().toISOString().slice(0, 7);
  const effectiveThreshold = warningThreshold ?? 80;

  // Upsert: if budget exists for this agent+period, update it
  const { data: existing } = await supabase
    .from("budgets")
    .select("id")
    .eq("company_id", companyId)
    .eq("agent_id", agentId)
    .eq("period", effectivePeriod)
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from("budgets")
      .update({
        monthly_limit_chf: monthlyLimitChf,
        warning_threshold: effectiveThreshold,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select("*, agents:agent_id(id, name)")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logActivity({
      companyId,
      actorType: "user",
      actorId: user.id,
      action: "updated_budget",
      entityType: "budget",
      entityId: data.id,
      details: { monthlyLimitChf, warningThreshold: effectiveThreshold, period: effectivePeriod },
    });

    return NextResponse.json({ budget: data });
  }

  const { data, error } = await supabase
    .from("budgets")
    .insert({
      company_id: companyId,
      agent_id: agentId,
      monthly_limit_chf: monthlyLimitChf,
      spent_chf: 0,
      warning_threshold: effectiveThreshold,
      period: effectivePeriod,
      is_paused: false,
    })
    .select("*, agents:agent_id(id, name)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logActivity({
    companyId,
    actorType: "user",
    actorId: user.id,
    action: "created_budget",
    entityType: "budget",
    entityId: data.id,
    agentId,
    details: { monthlyLimitChf, warningThreshold: effectiveThreshold, period: effectivePeriod },
  });

  return NextResponse.json({ budget: data }, { status: 201 });
}
