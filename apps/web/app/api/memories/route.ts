import { createClient } from "@/utils/supabase/server";
import { verifyCompanyOwnership } from "@/lib/auth";
import { getMemories, getEntityGraph, getAlerts } from "@/lib/brain";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const companyId = req.nextUrl.searchParams.get("companyId");

  if (!companyId) {
    return NextResponse.json(
      { error: "companyId ist erforderlich" },
      { status: 400 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  const view = req.nextUrl.searchParams.get("view");

  // Graph view — returns entity graph from Brain
  if (view === "graph") {
    const graph = await getEntityGraph(companyId);
    return NextResponse.json(graph);
  }

  // Alerts view — returns predictive alerts from Brain
  if (view === "alerts") {
    const alerts = await getAlerts(companyId);
    return NextResponse.json({ alerts });
  }

  // Default: list memories
  const agentId = req.nextUrl.searchParams.get("agentId");
  const type = req.nextUrl.searchParams.get("type");

  let memories = await getMemories(agentId, companyId);

  // Filter by type if provided
  if (type && (type === "episodic" || type === "semantic" || type === "procedural")) {
    memories = memories.filter((m) => m.type === type);
  }

  const entities = (await getEntityGraph(companyId)).nodes;
  const alerts = await getAlerts(companyId);

  return NextResponse.json({ memories, entities, alerts });
}
