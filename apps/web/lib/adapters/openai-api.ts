import { Adapter, AdapterExecutionContext, AdapterExecutionResult } from "./types";

export const openaiAdapter: Adapter = {
  type: "gpt",
  async execute(ctx: AdapterExecutionContext): Promise<AdapterExecutionResult> {
    const systemPrompt = ctx.agent.systemPrompt || `Du bist ${ctx.agent.name}, ein AI Agent mit der Rolle "${ctx.agent.role}". Arbeite professionell und effizient.`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ctx.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: (ctx.agent.config as any)?.model || "gpt-4o",
          max_tokens: (ctx.agent.config as any)?.maxTokens || 4096,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: ctx.prompt },
          ],
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        return { success: false, output: "", error: `OpenAI API error ${response.status}: ${errorBody}` };
      }

      const data = await response.json();

      return {
        success: true,
        output: data.choices?.[0]?.message?.content || "",
        usage: {
          inputTokens: data.usage?.prompt_tokens || 0,
          outputTokens: data.usage?.completion_tokens || 0,
          model: data.model || "gpt-4o",
        },
        costUsd: calculateCost(data.usage?.prompt_tokens || 0, data.usage?.completion_tokens || 0, data.model),
      };
    } catch (err: any) {
      return { success: false, output: "", error: err.message };
    }
  },
};

function calculateCost(inputTokens: number, outputTokens: number, model: string): number {
  const pricing: Record<string, { input: number; output: number }> = {
    "gpt-4o": { input: 2.5, output: 10 },
    "gpt-4o-mini": { input: 0.15, output: 0.6 },
    "gpt-4.1": { input: 2, output: 8 },
  };
  const p = pricing[model] || pricing["gpt-4o"];
  return (inputTokens * p.input + outputTokens * p.output) / 1_000_000;
}
