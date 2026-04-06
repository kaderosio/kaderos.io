import { createClient } from "@/utils/supabase/server";
import { logActivity } from "@/lib/activity";
import { verifyCompanyOwnership } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { data: doc, error } = await supabase
    .from("knowledge_documents")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !doc) {
    return NextResponse.json(
      { error: "Dokument nicht gefunden" },
      { status: 404 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, doc.company_id, user.id))) {
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  return NextResponse.json({ document: doc });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { data: doc, error: fetchError } = await supabase
    .from("knowledge_documents")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !doc) {
    return NextResponse.json(
      { error: "Dokument nicht gefunden" },
      { status: 404 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, doc.company_id, user.id))) {
    return NextResponse.json({ error: "Zugriff verweigert" }, { status: 403 });
  }

  const { error: deleteError } = await supabase
    .from("knowledge_documents")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  await logActivity({
    companyId: doc.company_id,
    actorType: "user",
    actorId: user.id,
    action: "knowledge_deleted",
    entityType: "knowledge_document",
    entityId: id,
    details: { name: doc.name },
  });

  return NextResponse.json({ success: true });
}
