import { createClient } from "@/utils/supabase/server";
import { decrypt } from "@/lib/crypto";
import { logActivity } from "@/lib/activity";
import { verifyCompanyOwnership } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { text, targetLang, companyId } = body;

  if (!text || !companyId) {
    return NextResponse.json(
      { error: "text and companyId are required" },
      { status: 400 }
    );
  }

  // Verify company ownership
  if (!(await verifyCompanyOwnership(supabase, companyId, user.id))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Load DeepL credential for the company
  const { data: credential } = await supabase
    .from("connector_credentials")
    .select("*")
    .eq("company_id", companyId)
    .eq("provider", "deepl")
    .eq("user_id", user.id)
    .single();

  if (!credential) {
    return NextResponse.json(
      {
        error:
          "Kein DeepL API Key gefunden. Bitte unter Connectors verbinden.",
      },
      { status: 400 }
    );
  }

  let apiKey: string;
  try {
    apiKey = decrypt(credential.encrypted_value);
  } catch {
    return NextResponse.json(
      { error: "API Key konnte nicht entschlüsselt werden." },
      { status: 500 }
    );
  }

  // Determine API URL (free vs pro key)
  const isFreeKey = apiKey.endsWith(":fx");
  const baseUrl = isFreeKey
    ? "https://api-free.deepl.com"
    : "https://api.deepl.com";

  const target = (targetLang || "DE").toUpperCase();

  try {
    const response = await fetch(`${baseUrl}/v2/translate`, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: [text],
        target_lang: target,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json(
        { error: `DeepL API error: ${response.status} ${errorBody}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const translation = data.translations?.[0]?.text || "";
    const sourceLang =
      data.translations?.[0]?.detected_source_language || "unknown";

    // Log activity
    await logActivity({
      companyId,
      actorType: "user",
      actorId: user.id,
      action: "translation_completed",
      entityType: "translation",
      entityId: credential.id,
      details: {
        sourceLang,
        targetLang: target,
        inputLength: text.length,
        outputLength: translation.length,
      },
    });

    return NextResponse.json({
      translation,
      sourceLang,
      targetLang: target,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Translation failed" },
      { status: 500 }
    );
  }
}
