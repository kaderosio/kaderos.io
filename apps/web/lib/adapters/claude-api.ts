import { Adapter, AdapterExecutionContext, AdapterExecutionResult } from "./types";

export const claudeAdapter: Adapter = {
  type: "claude",
  async execute(ctx: AdapterExecutionContext): Promise<AdapterExecutionResult> {
    const systemPrompt = ctx.agent.systemPrompt || `Du bist ${ctx.agent.name}, ein AI Agent mit der Rolle "${ctx.agent.role}". Arbeite professionell und effizient.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": ctx.apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: (ctx.agent.config as any)?.model || "claude-sonnet-4-6",
          max_tokens: (ctx.agent.config as any)?.maxTokens || 4096,
          system: systemPrompt,
          messages: [{ role: "user", content: ctx.prompt }],
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        return { success: false, output: "", error: `Anthropic API error ${response.status}: ${errorBody}` };
      }

      const data = await response.json();
      const textContent = data.content?.find((c: any) => c.type === "text");

      return {
        success: true,
        output: textContent?.text || "",
        usage: {
          inputTokens: data.usage?.input_tokens || 0,
          outputTokens: data.usage?.output_tokens || 0,
          model: data.model || "claude-sonnet-4-6",
        },
        costUsd: calculateCost(data.usage?.input_tokens || 0, data.usage?.output_tokens || 0, data.model),
      };
    } catch (err: any) {
      return { success: false, output: "", error: err.message };
    }
  },
};

function calculateCost(inputTokens: number, outputTokens: number, model: string): number {
  // Approximate pricing per 1M tokens
  const pricing: Record<string, { input: number; output: number }> = {
    "claude-sonnet-4-6": { input: 3, output: 15 },
    "claude-haiku-4-5-20251001": { input: 0.8, output: 4 },
    "claude-opus-4-6": { input: 15, output: 75 },
  };
  const p = pricing[model] || pricing["claude-sonnet-4-6"];
  return (inputTokens * p.input + outputTokens * p.output) / 1_000_000;
}
