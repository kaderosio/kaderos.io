import { createClient } from "@/utils/supabase/server";
import { verifyCompanyOwnership } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { executeWorkflow } from "@/lib/workflow-engine";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

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
    .select("*")
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

  // Parse optional input
  let input: Record<string, unknown> = {};
  try {
    const body = await req.json();
    if (body.input) {
      input = body.input;
    }
  } catch {
    // No body is fine
  }

  // Create workflow run record
  const { data: run, error: runError } = await supabase
    .from("workflow_runs")
    .insert({
      workflow_id: id,
      status: "running",
      trigger: "manual",
      input,
      started_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (runError || !run) {
    return NextResponse.json(
      { error: runError?.message || "Run konnte nicht erstellt werden" },
      { status: 500 }
    );
  }

  // Execute workflow inline
  await executeWorkflow(id, run.id, input);

  // Reload the run to get final status
  const { data: updatedRun } = await supabase
    .from("workflow_runs")
    .select("*")
    .eq("id", run.id)
    .single();

  return NextResponse.json({ run: updatedRun ?? run }, { status: 201 });
}
