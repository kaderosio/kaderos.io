import { createClient } from "@/utils/supabase/server";
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

  const [budgetsResult, costEntriesResult] = await Promise.all([
    supabase
      .from("budgets")
      .select("*, agents:agent_id(name)")
      .eq("company_id", companyId),
    supabase
      .from("cost_entries")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  if (budgetsResult.error) {
    return NextResponse.json({ error: budgetsResult.error.message }, { status: 500 });
  }

  if (costEntriesResult.error) {
    return NextResponse.json({ error: costEntriesResult.error.message }, { status: 500 });
  }

  return NextResponse.json({
    budgets: budgetsResult.data,
    costEntries: costEntriesResult.data,
  });
}
