import { createClient } from "@/utils/supabase/server";
import { verifyCompanyOwnership } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { resumeWorkflow } from "@/lib/workflow-engine";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; stepId: string }> }
) {
  const { id, stepId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  // Load workflow and verify ownership
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

  const body = await req.json();
  const { runId } = body;

  if (!runId) {
    return NextResponse.json(
      { error: "runId ist erforderlich" },
      { status: 400 }
    );
  }

  // Load the step run that's waiting for approval
  const { data: stepRun, error: stepRunError } = await supabase
    .from("workflow_step_runs")
    .select("*")
    .eq("workflow_run_id", runId)
    .eq("step_id", stepId)
    .eq("status", "waiting_approval")
    .single();

  if (stepRunError || !stepRun) {
    return NextResponse.json(
      { error: "Kein Step mit wartender Genehmigung gefunden" },
      { status: 404 }
    );
  }

  // Approve the step
  const { error: updateError } = await supabase
    .from("workflow_step_runs")
    .update({
      status: "completed",
      approved_by: user.id,
      output: { approved: true, approved_by: user.id },
      completed_at: new Date().toISOString(),
    })
    .eq("id", stepRun.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // Load the step to get its position
  const { data: step } = await supabase
    .from("workflow_steps")
    .select("position")
    .eq("id", stepId)
    .single();

  if (!step) {
    return NextResponse.json(
      { error: "Step nicht gefunden" },
      { status: 404 }
    );
  }

  await logActivity({
    companyId: workflow.company_id,
    actorType: "user",
    actorId: user.id,
    action: "step_approved",
    entityType: "workflow",
    entityId: id,
    details: { runId, stepId, stepPosition: step.position },
  });

  // Resume workflow from the next step
  const nextPosition = step.position + 1;
  await resumeWorkflow(runId, nextPosition);

  // Reload the run to get final status
  const { data: updatedRun } = await supabase
    .from("workflow_runs")
    .select("*")
    .eq("id", runId)
    .single();

  return NextResponse.json({ run: updatedRun });
}
