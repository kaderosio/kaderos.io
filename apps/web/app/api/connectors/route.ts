import { createClient } from "@/utils/supabase/server";
import { encrypt, sha256 } from "@/lib/crypto";
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

  if (companyId) {
    if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  let query = supabase
    .from("connector_credentials")
    .select(
      "id, provider, label, credential_type, metadata, is_active, last_tested_at, last_test_result, created_at"
    )
    .eq("user_id", user.id);

  if (companyId) {
    query = query.eq("company_id", companyId);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ connectors: data });
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
  const { companyId, provider, label, value, credentialType, metadata } = body;

  if (!companyId || !provider || !value) {
    return NextResponse.json(
      { error: "companyId, provider, and value are required" },
      { status: 400 }
    );
  }

  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const encrypted = encrypt(value);
  const valueHash = sha256(value);

  const { data, error } = await supabase
    .from("connector_credentials")
    .upsert(
      {
        company_id: companyId,
        provider,
        user_id: user.id,
        label: label || provider,
        credential_type: credentialType || "api_key",
        encrypted_value: encrypted,
        value_sha256: valueHash,
        metadata: metadata || {},
        is_active: true,
      },
      { onConflict: "company_id,provider,user_id" }
    )
    .select(
      "id, provider, label, credential_type, metadata, is_active, last_tested_at, last_test_result, created_at"
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ connector: data }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Connector id is required" },
      { status: 400 }
    );
  }

  // Verify ownership via connector's company
  const { data: connector } = await supabase
    .from("connector_credentials")
    .select("company_id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();
  if (!connector) {
    return NextResponse.json({ error: "Connector not found" }, { status: 404 });
  }
  if (!(await verifyCompanyOwnership(supabase, connector.company_id, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("connector_credentials")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json(
      { error: "Connector not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
