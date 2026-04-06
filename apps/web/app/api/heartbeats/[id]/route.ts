import { createClient } from "@/utils/supabase/server";
import { verifyCompanyOwnership } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify ownership: get heartbeat's company_id first
  const { data: heartbeat } = await supabase
    .from("heartbeats")
    .select("company_id")
    .eq("id", id)
    .single();

  if (!heartbeat || !(await verifyCompanyOwnership(supabase, heartbeat.company_id, user.id))) {
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  const body = await req.json();
  const update: Record<string, unknown> = {};

  if (typeof body.isEnabled === "boolean") {
    update.is_enabled = body.isEnabled;
  }

  if (typeof body.cronExpression === "string") {
    update.cron_expression = body.cronExpression;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { error: "Nothing to update" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("heartbeats")
    .update(update)
    .eq("id", id)
    .select("*, agents(name, accent_color, role)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ heartbeat: data });
}
