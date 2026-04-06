import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { verifyCompanyOwnership } from "@/lib/auth";
import { PLANS, PlanKey } from "@/lib/stripe";
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

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ agents: data });
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
  const { companyId, name, role, type, systemPrompt, jobDescription, config, skills, focus, accentColor, departmentId } = body;

  if (!companyId || !name || !role) {
    return NextResponse.json(
      { error: "companyId, name, and role are required" },
      { status: 400 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ── Agent limit enforcement ──────────────────────────────────────
  const { data: company } = await supabase
    .from("companies")
    .select("settings")
    .eq("id", companyId)
    .single();

  const plan: PlanKey = (company?.settings?.plan as PlanKey) || "free";
  const planConfig = PLANS[plan];
  const agentLimit = planConfig.agents;

  // -1 means unlimited (business plan)
  if (agentLimit !== -1) {
    const { count } = await supabase
      .from("agents")
      .select("id", { count: "exact", head: true })
      .eq("company_id", companyId);

    if ((count ?? 0) >= agentLimit) {
      const nextPlan = plan === "free" ? "Pro" : "Business";
      return NextResponse.json(
        {
          error: `Agent-Limit erreicht (${agentLimit}). Upgrade auf ${nextPlan}.`,
        },
        { status: 403 }
      );
    }
  }
  // ─────────────────────────────────────────────────────────────────

  const { data, error } = await supabase
    .from("agents")
    .insert({
      company_id: companyId,
      name,
      role,
      type: type || "worker",
      status: "active",
      system_prompt: systemPrompt || null,
      job_description: jobDescription || null,
      config: config || {},
      skills: skills || [],
      focus: focus || null,
      accent_color: accentColor || null,
      department_id: departmentId || null,
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
    action: "created_agent",
    entityType: "agent",
    entityId: data.id,
    agentId: data.id,
    details: { name, role },
  });

  return NextResponse.json({ agent: data }, { status: 201 });
}
