import { SupabaseClient } from "@supabase/supabase-js";

export const USD_TO_CHF = 0.88;

export async function checkBudget(
  supabase: SupabaseClient,
  agentId: string,
  companyId: string
): Promise<{ allowed: boolean; budget: any | null; remaining: number }> {
  const period = new Date().toISOString().slice(0, 7);

  const { data: budget } = await supabase
    .from("budgets")
    .select("*")
    .eq("agent_id", agentId)
    .eq("company_id", companyId)
    .eq("period", period)
    .single();

  if (!budget) {
    return { allowed: true, budget: null, remaining: Infinity };
  }

  if (budget.is_paused) {
    return { allowed: false, budget, remaining: 0 };
  }

  const remaining = budget.monthly_limit_chf - budget.spent_chf;
  if (remaining <= 0) {
    return { allowed: false, budget, remaining: 0 };
  }

  return { allowed: true, budget, remaining };
}

export async function recordCost(
  supabase: SupabaseClient,
  params: {
    budgetId: string | null;
    agentId: string;
    taskId: string;
    amountChf: number;
    tokensUsed: number;
    model: string;
  }
): Promise<void> {
  const { error: insertError } = await supabase.from("cost_entries").insert({
    budget_id: params.budgetId,
    agent_id: params.agentId,
    task_id: params.taskId,
    amount_chf: params.amountChf,
    tokens_used: params.tokensUsed,
    model: params.model,
  });

  if (insertError) {
    console.error("Failed to insert cost_entry:", insertError);
  }

  if (params.budgetId) {
    const { data: current } = await supabase
      .from("budgets")
      .select("spent_chf")
      .eq("id", params.budgetId)
      .single();

    if (current) {
      await supabase
        .from("budgets")
        .update({ spent_chf: current.spent_chf + params.amountChf })
        .eq("id", params.budgetId);
    }
  }
}
