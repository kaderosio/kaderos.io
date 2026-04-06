/**
 * Brain API Client — Stub with no-op implementations.
 * Replace with real Brain API calls when integrating Agent Brain.
 * Brain API: https://agent-brain-production-1064.up.railway.app
 */

export interface BrainMemory {
  id: string;
  content: string;
  type: "episodic" | "semantic" | "procedural";
  agentName?: string;
  relevance: number;
  createdAt: string;
}

export interface BrainEntity {
  name: string;
  type: string;
  weight: number;
}

export interface BrainAlert {
  id: string;
  content: string;
  probability: number;
  resolved: boolean;
  createdAt: string;
}

// Hook 1: Get relevant context before agent run
export async function getRelevantContext(agentId: string, prompt: string): Promise<string> {
  // TODO: Brain API recall → return context string
  return "";
}

// Hook 2: Store memory after agent run
export async function storeMemory(agentId: string, input: string, output: string): Promise<void> {
  // TODO: Brain API store
}

// Hook 3: Get memories for display
export async function getMemories(agentId: string | null, companyId: string): Promise<BrainMemory[]> {
  // TODO: Brain API recall
  return [];
}

// Hook 4: Get entity graph
export async function getEntityGraph(companyId: string): Promise<{ nodes: BrainEntity[]; edges: any[] }> {
  // TODO: Brain API entities
  return { nodes: [], edges: [] };
}

// Hook 5: Get predictive alerts
export async function getAlerts(companyId: string): Promise<BrainAlert[]> {
  // TODO: Brain API predict
  return [];
}

// Hook 6: Process uploaded document
export async function processDocument(docId: string, content: string): Promise<void> {
  // TODO: Brain API store with source_trust=0.9
}
