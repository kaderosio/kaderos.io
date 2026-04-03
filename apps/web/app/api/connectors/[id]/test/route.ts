import { createClient } from "@/utils/supabase/server";
import { decrypt } from "@/lib/crypto";
import { NextRequest, NextResponse } from "next/server";

interface TestResult {
  success: boolean;
  message: string;
}

async function testAnthropic(apiKey: string): Promise<TestResult> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "content-type": "application/json",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 10,
      messages: [{ role: "user", content: "Hi" }],
    }),
  });

  if (res.ok) {
    return { success: true, message: "Anthropic API key is valid" };
  }

  const body = await res.json().catch(() => null);
  return {
    success: false,
    message: body?.error?.message || `Anthropic test failed (${res.status})`,
  };
}

async function testOpenai(apiKey: string): Promise<TestResult> {
  const res = await fetch("https://api.openai.com/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (res.ok) {
    return { success: true, message: "OpenAI API key is valid" };
  }

  const body = await res.json().catch(() => null);
  return {
    success: false,
    message: body?.error?.message || `OpenAI test failed (${res.status})`,
  };
}

async function testDeepl(apiKey: string): Promise<TestResult> {
  const res = await fetch("https://api-free.deepl.com/v2/usage", {
    headers: { Authorization: `DeepL-Auth-Key ${apiKey}` },
  });

  if (res.ok) {
    return { success: true, message: "DeepL API key is valid" };
  }

  const body = await res.json().catch(() => null);
  return {
    success: false,
    message: body?.message || `DeepL test failed (${res.status})`,
  };
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const { data: connector, error } = await supabase
    .from("connectors")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !connector) {
    return NextResponse.json(
      { error: "Connector not found" },
      { status: 404 }
    );
  }

  let result: TestResult;

  try {
    const apiKey = decrypt(connector.encrypted_value);

    switch (connector.provider) {
      case "anthropic":
        result = await testAnthropic(apiKey);
        break;
      case "openai":
        result = await testOpenai(apiKey);
        break;
      case "deepl":
        result = await testDeepl(apiKey);
        break;
      default:
        result = {
          success: true,
          message: "Key gespeichert (kein Test verfügbar)",
        };
    }
  } catch (err) {
    result = {
      success: false,
      message: err instanceof Error ? err.message : "Decryption failed",
    };
  }

  await supabase
    .from("connectors")
    .update({
      last_tested_at: new Date().toISOString(),
      last_test_result: result,
    })
    .eq("id", id);

  return NextResponse.json(result);
}
