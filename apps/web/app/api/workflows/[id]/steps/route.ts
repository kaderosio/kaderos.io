import { createClient } from "@/utils/supabase/server";
import { verifyCompanyOwnership } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { data: workflow, error: wfError } = await supabase
    .from("workflows")
    .select("company_id")
    .eq("id", id)
    .single();

  if (wfError || !workflow) {
    return NextResponse.json(
      { error: "Workflow nicht gefunden" },
      { status: 404 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, workflow.company_id, user.id))) {
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  const { data: steps, error } = await supabase
    .from("workflow_steps")
    .select("*, agents(id, name, type)")
    .eq("workflow_id", id)
    .order("position", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ steps: steps ?? [] });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { data: workflow, error: wfError } = await supabase
    .from("workflows")
    .select("company_id")
    .eq("id", id)
    .single();

  if (wfError || !workflow) {
    return NextResponse.json(
      { error: "Workflow nicht gefunden" },
      { status: 404 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, workflow.company_id, user.id))) {
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  const body = await req.json();
  const { stepType, agentId, promptTemplate, config, position } = body;

  if (!stepType) {
    return NextResponse.json(
      { error: "stepType ist erforderlich" },
      { status: 400 }
    );
  }

  // Determine position: use provided or append at end
  let stepPosition = position;
  if (stepPosition === undefined || stepPosition === null) {
    const { data: lastStep } = await supabase
      .from("workflow_steps")
      .select("position")
      .eq("workflow_id", id)
      .order("position", { ascending: false })
      .limit(1)
      .single();

    stepPosition = lastStep ? lastStep.position + 1 : 0;
  }

  const { data, error } = await supabase
    .from("workflow_steps")
    .insert({
      workflow_id: id,
      step_type: stepType,
      agent_id: agentId || null,
      prompt_template: promptTemplate || null,
      config: config || {},
      position: stepPosition,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ step: data }, { status: 201 });
}
