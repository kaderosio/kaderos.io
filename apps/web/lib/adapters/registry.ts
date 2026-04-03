import { Adapter } from "./types";
import { claudeAdapter } from "./claude-api";
import { openaiAdapter } from "./openai-api";

const adapters: Record<string, Adapter> = {
  claude: claudeAdapter,
  gpt: openaiAdapter,
};

export function getAdapter(type: string): Adapter | null {
  return adapters[type] || null;
}

export function listAdapters(): string[] {
  return Object.keys(adapters);
}
