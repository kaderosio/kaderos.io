import { createClient as createServiceClient } from "@supabase/supabase-js";
import { getAdapter } from "@/lib/adapters/registry";
import { decrypt } from "@/lib/crypto";
import { randomUUID } from "crypto";

const PROVIDER_MAP: Record<string, string> = {
  claude: "anthropic",
  gpt: "openai",
  mistral: "mistral",
  deepl: "deepl",
};

function getServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createServiceClient(supabaseUrl, serviceRoleKey);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function logActivityWithClient(
  supabase: any,
  input: {
    companyId: string;
    actorType: "user" | "agent" | "system";
    actorId: string;
    action: string;
    entityType: string;
    entityId: string;
    agentId?: string;
    details?: Record<string, unknown>;
  }
) {
  const { error } = await supabase.from("activity_log").insert({
    company_id: input.companyId,
    actor_type: input.actorType,
    actor_id: input.actorId,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId,
    agent_id: input.agentId ?? null,
    details: input.details ?? {},
  });
  if (error) {
    console.error("Failed to log activity:", error);
  }
}

function interpolateTemplate(
  template: string,
  input: unknown,
  previousOutput: unknown
): string {
  const inputStr =
    typeof input === "string" ? input : JSON.stringify(input ?? {});
  const prevStr =
    typeof previousOutput === "string"
      ? previousOutput
      : JSON.stringify(previousOutput ?? {});

  return template
    .replace(/\{input\}/g, inputStr)
    .replace(/\{previous_output\}/g, prevStr);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function executeAgentStep(
  supabase: any,
  step: any,
  stepInput: unknown
): Promise<{ success: boolean; output: string; error?: string }> {
  if (!step.agent_id) {
    return { success: false, output: "", error: "Kein Agent für diesen Step konfiguriert" };
  }

  const { data: agent } = await supabase
    .from("agents")
    .select("*")
    .eq("id", step.agent_id)
    .single();

  if (!agent) {
    return { success: false, output: "", error: `Agent ${step.agent_id} nicht gefunden` };
  }

  const providerKey = PROVIDER_MAP[agent.type] || agent.type;
  const { data: credential } = await supabase
    .from("connector_credentials")
    .select("*")
    .eq("company_id", agent.company_id)
    .eq("provider", providerKey)
    .limit(1)
    .single();

  if (!credential) {
    return {
      success: false,
      output: "",
      error: `Keine Zugangsdaten für Provider ${providerKey} gefunden`,
    };
  }

  const adapter = getAdapter(agent.type);
  if (!adapter) {
    return {
      success: false,
      output: "",
      error: `Kein Adapter für Agent-Typ ${agent.type} verfügbar`,
    };
  }

  const apiKey = decrypt(credential.encrypted_value);
  // prompt_template is already interpolated by the caller (executeWorkflow)
  const prompt = step.prompt_template
    ? step.prompt_template
    : typeof stepInput === "string"
      ? stepInput
      : JSON.stringify(stepInput ?? {});

  const runId = randomUUID();
  const result = await adapter.execute({
    runId,
    agent: {
      id: agent.id,
      name: agent.name,
      role: agent.role,
      systemPrompt: agent.system_prompt,
      config: agent.config ?? {},
    },
    prompt,
    apiKey,
  });

  if (result.success) {
    return { success: true, output: result.output };
  } else {
    return { success: false, output: "", error: result.error || "Unbekannter Fehler" };
  }
}

export async function executeWorkflow(
  workflowId: string,
  runId: string,
  input: Record<string, unknown> = {},
  fromStepPosition: number = 0
) {
  const supabase = getServiceClient();

  try {
    // Load workflow
    const { data: workflow, error: wfError } = await supabase
      .from("workflows")
      .select("*")
      .eq("id", workflowId)
      .single();

    if (wfError || !workflow) {
      await supabase
        .from("workflow_runs")
        .update({
          status: "failed",
          error: "Workflow nicht gefunden",
          completed_at: new Date().toISOString(),
        })
        .eq("id", runId);
      return;
    }

    // Load steps ordered by position
    const { data: steps, error: stepsError } = await supabase
      .from("workflow_steps")
      .select("*")
      .eq("workflow_id", workflowId)
      .order("position", { ascending: true });

    if (stepsError || !steps || steps.length === 0) {
      await supabase
        .from("workflow_runs")
        .update({
          status: "failed",
          error: "Keine Steps im Workflow gefunden",
          completed_at: new Date().toISOString(),
        })
        .eq("id", runId);

      await logActivityWithClient(supabase, {
        companyId: workflow.company_id,
        actorType: "system",
        actorId: "workflow-engine",
        action: "workflow_failed",
        entityType: "workflow",
        entityId: workflowId,
        details: { runId, error: "Keine Steps im Workflow" },
      });
      return;
    }

    // Log workflow started (only on fresh runs)
    if (fromStepPosition === 0) {
      await logActivityWithClient(supabase, {
        companyId: workflow.company_id,
        actorType: "system",
        actorId: "workflow-engine",
        action: "workflow_started",
        entityType: "workflow",
        entityId: workflowId,
        details: { runId, input },
      });
    }

    // Filter steps to execute from the given position
    const stepsToRun = steps.filter((s: any) => s.position >= fromStepPosition);

    let previousOutput: unknown = input;

    // If resuming, load previous step output
    if (fromStepPosition > 0) {
      const previousSteps = steps.filter((s: any) => s.position < fromStepPosition);
      if (previousSteps.length > 0) {
        const lastPrevStep = previousSteps[previousSteps.length - 1];
        const { data: prevStepRun } = await supabase
          .from("workflow_step_runs")
          .select("output")
          .eq("workflow_run_id", runId)
          .eq("step_id", lastPrevStep.id)
          .single();
        if (prevStepRun) {
          previousOutput = prevStepRun.output;
        }
      }
    }

    for (const step of stepsToRun) {
      // Create step run record
      const { data: stepRun, error: stepRunError } = await supabase
        .from("workflow_step_runs")
        .insert({
          workflow_run_id: runId,
          step_id: step.id,
          status: "running",
          input: previousOutput ?? {},
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (stepRunError || !stepRun) {
        throw new Error(`Step-Run konnte nicht erstellt werden: ${stepRunError?.message}`);
      }

      // Update current step on the run
      await supabase
        .from("workflow_runs")
        .update({ current_step: step.position })
        .eq("id", runId);

      let stepResult: { success: boolean; output: string; error?: string };

      switch (step.step_type) {
        case "agent_run": {
          // Interpolate prompt template with {input} and {previous_output}
          const interpolatedStep = step.prompt_template
            ? {
                ...step,
                prompt_template: interpolateTemplate(
                  step.prompt_template,
                  input,
                  previousOutput
                ),
              }
            : step;
          stepResult = await executeAgentStep(
            supabase,
            interpolatedStep,
            previousOutput
          );
          break;
        }

        case "human_approval": {
          // Set step run to waiting, stop execution
          await supabase
            .from("workflow_step_runs")
            .update({
              status: "waiting_approval",
            })
            .eq("id", stepRun.id);

          await supabase
            .from("workflow_runs")
            .update({ status: "waiting_approval" })
            .eq("id", runId);

          // Execution pauses here, will be resumed via approve endpoint
          return;
        }

        case "conditional": {
          const config = step.config as Record<string, unknown> | null;
          const condition = (config?.condition as string) || "";
          const prevStr =
            typeof previousOutput === "string"
              ? previousOutput
              : JSON.stringify(previousOutput ?? "");

          const conditionMet = condition
            ? prevStr.toLowerCase().includes(condition.toLowerCase())
            : true;

          if (conditionMet) {
            stepResult = {
              success: true,
              output: typeof previousOutput === "string" ? previousOutput : JSON.stringify(previousOutput),
            };
          } else {
            // Skip remaining steps
            await supabase
              .from("workflow_step_runs")
              .update({
                status: "skipped",
                output: { skipped: true, reason: `Bedingung nicht erfüllt: "${condition}"` },
                completed_at: new Date().toISOString(),
              })
              .eq("id", stepRun.id);

            stepResult = {
              success: true,
              output: `Step übersprungen: Bedingung "${condition}" nicht erfüllt`,
            };
          }
          break;
        }

        case "delay": {
          const config = step.config as Record<string, unknown> | null;
          const minutes = (config?.minutes as number) || 0;
          stepResult = {
            success: true,
            output: `Delay-Step: ${minutes} Minuten Wartezeit (aktuell übersprungen)`,
          };
          break;
        }

        default: {
          stepResult = {
            success: false,
            output: "",
            error: `Unbekannter Step-Typ: ${step.step_type}`,
          };
        }
      }

      // Update step run with result
      await supabase
        .from("workflow_step_runs")
        .update({
          status: stepResult.success ? "completed" : "failed",
          output: stepResult.output,
          error: stepResult.error || null,
          completed_at: new Date().toISOString(),
        })
        .eq("id", stepRun.id);

      if (!stepResult.success) {
        // Step failed — fail the whole run
        await supabase
          .from("workflow_runs")
          .update({
            status: "failed",
            error: stepResult.error || "Step fehlgeschlagen",
            output: { lastStepOutput: stepResult.output },
            completed_at: new Date().toISOString(),
          })
          .eq("id", runId);

        await logActivityWithClient(supabase, {
          companyId: workflow.company_id,
          actorType: "system",
          actorId: "workflow-engine",
          action: "workflow_failed",
          entityType: "workflow",
          entityId: workflowId,
          details: {
            runId,
            failedStep: step.position,
            error: stepResult.error,
          },
        });
        return;
      }

      // Chain output
      previousOutput = stepResult.output;
    }

    // All steps completed
    await supabase
      .from("workflow_runs")
      .update({
        status: "completed",
        output: { result: previousOutput },
        completed_at: new Date().toISOString(),
      })
      .eq("id", runId);

    await supabase
      .from("workflows")
      .update({ last_run_at: new Date().toISOString() })
      .eq("id", workflowId);

    await logActivityWithClient(supabase, {
      companyId: workflow.company_id,
      actorType: "system",
      actorId: "workflow-engine",
      action: "workflow_completed",
      entityType: "workflow",
      entityId: workflowId,
      details: { runId },
    });
  } catch (err: any) {
    console.error(`Workflow execution error (${workflowId}):`, err);

    await supabase
      .from("workflow_runs")
      .update({
        status: "failed",
        error: err.message || "Unbekannter Fehler",
        completed_at: new Date().toISOString(),
      })
      .eq("id", runId);

    // Try to log activity — workflow may not be loaded
    try {
      const { data: workflow } = await supabase
        .from("workflows")
        .select("company_id")
        .eq("id", workflowId)
        .single();

      if (workflow) {
        await logActivityWithClient(supabase, {
          companyId: workflow.company_id,
          actorType: "system",
          actorId: "workflow-engine",
          action: "workflow_failed",
          entityType: "workflow",
          entityId: workflowId,
          details: { runId, error: err.message },
        });
      }
    } catch {
      // Ignore logging failure
    }
  }
}

export async function resumeWorkflow(runId: string, fromStepPosition: number) {
  const supabase = getServiceClient();

  // Load the run to get workflow ID and input
  const { data: run, error } = await supabase
    .from("workflow_runs")
    .select("*")
    .eq("id", runId)
    .single();

  if (error || !run) {
    throw new Error("Workflow-Run nicht gefunden");
  }

  // Update run status back to running
  await supabase
    .from("workflow_runs")
    .update({ status: "running" })
    .eq("id", runId);

  await executeWorkflow(
    run.workflow_id,
    runId,
    (run.input as Record<string, unknown>) ?? {},
    fromStepPosition
  );
}
