import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  UIMessage,
} from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { decrypt } from "@/lib/crypto";
import { logActivity } from "@/lib/activity";
import { verifyCompanyOwnership } from "@/lib/auth";
import { randomUUID } from "crypto";

const PROVIDER_MAP: Record<string, string> = {
  claude: "anthropic",
  gpt: "openai",
  deepl: "deepl",
};

const MODEL_MAP: Record<string, string> = {
  claude: "claude-sonnet-4-20250514",
  gpt: "gpt-4o",
};

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const agentId = req.nextUrl.searchParams.get("agentId") || body.agentId;

  if (!agentId) {
    return new Response("agentId required. Bitte wähle einen Agent aus.", { status: 400 });
  }
  const { messages } = body;

  // Get agent
  const { data: agent } = await supabase
    .from("agents")
    .select("*")
    .eq("id", agentId)
    .single();
  if (!agent) return new Response("Agent not found", { status: 404 });

  // Verify company ownership
  if (!(await verifyCompanyOwnership(supabase, agent.company_id, user.id))) {
    return new Response("Forbidden", { status: 403 });
  }

  // Get API key
  const provider = PROVIDER_MAP[agent.type] || agent.type;
  const { data: credential } = await supabase
    .from("connector_credentials")
    .select("*")
    .eq("company_id", agent.company_id)
    .eq("provider", provider)
    .eq("user_id", user.id)
    .single();

  if (!credential) {
    return new Response(
      `Kein API Key für ${provider} gefunden. Bitte unter Connectors verbinden.`,
      { status: 400 }
    );
  }

  let apiKey: string;
  try {
    apiKey = decrypt(credential.encrypted_value);
  } catch {
    return new Response("API Key konnte nicht entschlüsselt werden.", { status: 500 });
  }

  const runId = randomUUID();

  // Create model instance
  let model;
  if (agent.type === "claude" || provider === "anthropic") {
    const anthropic = createAnthropic({ apiKey });
    model = anthropic(MODEL_MAP[agent.type] || "claude-sonnet-4-20250514");
  } else {
    const openai = createOpenAI({ apiKey });
    model = openai(MODEL_MAP[agent.type] || "gpt-4o");
  }

  let modelMessages;
  try {
    modelMessages = await convertToModelMessages(messages as UIMessage[]);
  } catch {
    return new Response("Ungültiges Nachrichtenformat.", { status: 400 });
  }

  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      const result = streamText({
        model,
        system:
          agent.system_prompt ||
          `Du bist ${agent.name}, ${agent.role}. Antworte auf Deutsch.`,
        messages: modelMessages,
        onFinish: async ({ usage }) => {
          const totalTokens = usage
            ? (usage.inputTokens ?? 0) + (usage.outputTokens ?? 0)
            : 0;

          // Log activity
          await logActivity({
            companyId: agent.company_id,
            actorType: "agent",
            actorId: agent.id,
            action: "agent_run_completed",
            entityType: "meeting_message",
            entityId: runId,
            agentId: agent.id,
            details: {
              model: MODEL_MAP[agent.type],
              tokens: totalTokens,
              runId,
            },
          });
        },
      });

      writer.merge(result.toUIMessageStream());
    },
  });

  return createUIMessageStreamResponse({ stream });
}
