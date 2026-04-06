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
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const companyId = req.nextUrl.searchParams.get("companyId");

  if (!companyId) {
    return NextResponse.json(
      { error: "companyId ist erforderlich" },
      { status: 400 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ workflows: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const body = await req.json();
  const { companyId, name, description, triggerType } = body;

  if (!companyId || !name) {
    return NextResponse.json(
      { error: "companyId und name sind erforderlich" },
      { status: 400 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("workflows")
    .insert({
      company_id: companyId,
      name,
      description: description || null,
      trigger_type: triggerType || "manual",
      status: "draft",
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
    action: "created_workflow",
    entityType: "workflow",
    entityId: data.id,
    details: { name, triggerType: triggerType || "manual" },
  });

  return NextResponse.json({ workflow: data }, { status: 201 });
}
