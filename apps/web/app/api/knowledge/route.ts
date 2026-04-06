import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { verifyCompanyOwnership } from "@/lib/auth";
import { processDocument } from "@/lib/brain";
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

  const agentId = req.nextUrl.searchParams.get("agentId");

  let query = supabase
    .from("knowledge_documents")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (agentId) {
    query = query.contains("agent_ids", [agentId]);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ documents: data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const body = await req.json();
  const { companyId, name, fileType, sizeBytes, agentIds } = body;

  if (!companyId || !name || !fileType) {
    return NextResponse.json(
      { error: "companyId, name und fileType sind erforderlich" },
      { status: 400 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("knowledge_documents")
    .insert({
      company_id: companyId,
      name,
      file_type: fileType,
      size_bytes: sizeBytes || null,
      status: "uploaded",
      agent_ids: agentIds || [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // No-op for now — will hook to Brain API later
  await processDocument(data.id, "");

  await logActivity({
    companyId,
    actorType: "user",
    actorId: user.id,
    action: "knowledge_uploaded",
    entityType: "knowledge_document",
    entityId: data.id,
    details: { name, fileType, sizeBytes },
  });

  return NextResponse.json({ document: data }, { status: 201 });
}
