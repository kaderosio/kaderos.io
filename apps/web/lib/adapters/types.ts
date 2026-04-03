export interface AdapterExecutionContext {
  runId: string;
  agent: {
    id: string;
    name: string;
    role: string;
    systemPrompt: string | null;
    config: Record<string, unknown>;
  };
  prompt: string; // The task/instruction for the agent
  apiKey: string; // Decrypted API key
}

export interface AdapterExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    model: string;
  };
  costUsd?: number;
}

export interface Adapter {
  type: string;
  execute(ctx: AdapterExecutionContext): Promise<AdapterExecutionResult>;
}
