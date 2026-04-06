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

  const { data: runs, error } = await supabase
    .from("workflow_runs")
    .select("*")
    .eq("workflow_id", id)
    .order("started_at", { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ runs: runs ?? [] });
}
