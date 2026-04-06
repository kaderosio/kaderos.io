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
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("heartbeats")
    .select("*, agents(name, accent_color, role)")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ heartbeats: data });
}
