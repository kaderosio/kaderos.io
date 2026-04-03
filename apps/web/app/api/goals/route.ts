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

  const { data, error } = await supabase
    .from("goals")
    .select("*, agents:owner_agent_id(name, accent_color)")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ goals: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { companyId, title, description, ownerAgentId, deadline } = body;

  if (!companyId || !title) {
    return NextResponse.json(
      { error: "companyId and title are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("goals")
    .insert({
      company_id: companyId,
      title,
      description: description || null,
      owner_agent_id: ownerAgentId || null,
      deadline: deadline || null,
      status: "active",
      progress: 0,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ goal: data }, { status: 201 });
}
