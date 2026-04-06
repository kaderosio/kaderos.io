import { Adapter, AdapterExecutionContext, AdapterExecutionResult } from "./types";

export const deeplAdapter: Adapter = {
  type: "deepl",
  async execute(ctx: AdapterExecutionContext): Promise<AdapterExecutionResult> {
    // Parse the prompt to extract translation request
    // Expected format: "Übersetze: [text]\nZielsprache: [lang code]"
    // Or just treat the whole prompt as text to translate to German by default

    const lines = ctx.prompt.split("\n");
    let textToTranslate = ctx.prompt;
    let targetLang = "DE"; // Default to German

    // Try to parse structured format
    for (const line of lines) {
      if (line.startsWith("Zielsprache:"))
        targetLang = line.replace("Zielsprache:", "").trim().toUpperCase();
      if (line.startsWith("Übersetze:"))
        textToTranslate = line.replace("Übersetze:", "").trim();
      if (line.startsWith("Text:"))
        textToTranslate = line.replace("Text:", "").trim();
    }

    // Determine API URL (free vs pro key)
    const isFreeKey = ctx.apiKey.endsWith(":fx");
    const baseUrl = isFreeKey
      ? "https://api-free.deepl.com"
      : "https://api.deepl.com";

    try {
      const startTime = Date.now();
      const response = await fetch(`${baseUrl}/v2/translate`, {
        method: "POST",
        headers: {
          Authorization: `DeepL-Auth-Key ${ctx.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: [textToTranslate],
          target_lang: targetLang,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return {
          success: false,
          output: "",
          error: `DeepL API error: ${response.status} ${error}`,
        };
      }

      const data = await response.json();
      const duration = Date.now() - startTime;
      const translated = data.translations?.[0]?.text || "";
      const sourceLang =
        data.translations?.[0]?.detected_source_language || "unknown";

      return {
        success: true,
        output: `Übersetzung (${sourceLang} \u2192 ${targetLang}):\n\n${translated}`,
        usage: {
          inputTokens: textToTranslate.length,
          outputTokens: translated.length,
          model: "deepl-translate",
        },
        costUsd: (0.00002 * textToTranslate.length) / 1000, // ~$20 per million chars
      };
    } catch (err: any) {
      return { success: false, output: "", error: err.message };
    }
  },
};
