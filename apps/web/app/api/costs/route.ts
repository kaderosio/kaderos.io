import { createClient } from "@/utils/supabase/server";
import { verifyCompanyOwnership } from "@/lib/auth";
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

  // Get budgets for this company
  const { data: budgets, error: budgetsError } = await supabase
    .from("budgets")
    .select("*, agents:agent_id(name)")
    .eq("company_id", companyId);

  if (budgetsError) {
    return NextResponse.json({ error: budgetsError.message }, { status: 500 });
  }

  // Get cost_entries via budget_ids (cost_entries has no company_id column)
  const budgetIds = (budgets ?? []).map((b: any) => b.id);
  let costEntries: any[] = [];
  if (budgetIds.length > 0) {
    const { data, error } = await supabase
      .from("cost_entries")
      .select("*, agents:agent_id(name)")
      .in("budget_id", budgetIds)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    costEntries = data ?? [];
  }

  return NextResponse.json({ budgets, costEntries });
}
