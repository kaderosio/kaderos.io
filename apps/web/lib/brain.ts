/**
 * Brain API Client — Live integration with Agent Brain.
 * API: https://agent-brain-production-1064.up.railway.app
 *
 * Each KaderOS company maps to a Brain workspace.
 * For now we use a shared workspace; per-company workspaces come in Phase 2.
 */

const BRAIN_API = "https://agent-brain-production-1064.up.railway.app";
const BRAIN_WORKSPACE = process.env.BRAIN_WORKSPACE_ID ?? "b00d8f28-88a1-4516-8089-94064f4d4f48";
const BRAIN_API_KEY = process.env.BRAIN_API_KEY ?? "brain_GdmP4i8lspBWLpXcCQZ15ENYhvbZRVaTBEwq_sqfltU";

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

async function brainFetch(path: string, body?: Record<string, unknown>): Promise<unknown> {
  try {
    const res = await fetch(`${BRAIN_API}${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": BRAIN_API_KEY,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Hook 1: Get relevant context before agent run
export async function getRelevantContext(agentId: string, prompt: string): Promise<string> {
  const data = (await brainFetch("/memory/recall", {
    workspace_id: BRAIN_WORKSPACE,
    query: prompt,
    agent_id: agentId,
    limit: 5,
  })) as { memories?: { content: string; relevance: number }[] } | null;

  if (!data?.memories?.length) return "";

  return data.memories
    .filter((m) => m.relevance > 0.3)
    .map((m) => m.content)
    .join("\n---\n");
}

// Hook 2: Store memory after agent run
export async function storeMemory(agentId: string, input: string, output: string): Promise<void> {
  await brainFetch("/memory/store", {
    workspace_id: BRAIN_WORKSPACE,
    agent_id: agentId,
    content: `[Agent Run] Input: ${input.slice(0, 500)}\nOutput: ${output.slice(0, 1000)}`,
    source_trust: 0.8,
  });
}

// Hook 3: Get memories for display
export async function getMemories(agentId: string | null, companyId: string): Promise<BrainMemory[]> {
  const data = (await brainFetch("/memory/recall", {
    workspace_id: BRAIN_WORKSPACE,
    query: agentId ? `agent ${agentId} activities and decisions` : "recent activities and decisions",
    agent_id: agentId,
    limit: 20,
  })) as { memories?: Array<{
    id: string;
    content: string;
    type: string;
    relevance: number;
    created_at: string;
    access_count: number;
  }> } | null;

  if (!data?.memories) return [];

  return data.memories.map((m) => ({
    id: m.id,
    content: m.content,
    type: (m.type || "episodic") as BrainMemory["type"],
    relevance: m.relevance,
    createdAt: m.created_at,
  }));
}

// Hook 4: Get entity graph
export async function getEntityGraph(companyId: string): Promise<{ nodes: BrainEntity[]; edges: Array<{ source: string; target: string; label: string }> }> {
  const data = (await brainFetch("/memory/recall", {
    workspace_id: BRAIN_WORKSPACE,
    query: "all entities and relationships",
    limit: 30,
  })) as { entities?: Array<{ name: string; type: string; weight?: number }>; relationships?: Array<{ source: string; target: string; type: string }> } | null;

  if (!data) return { nodes: [], edges: [] };

  const nodes: BrainEntity[] = (data.entities || []).map((e) => ({
    name: e.name,
    type: e.type,
    weight: e.weight ?? 0.5,
  }));

  const edges = (data.relationships || []).map((r) => ({
    source: r.source,
    target: r.target,
    label: r.type,
  }));

  return { nodes, edges };
}

// Hook 5: Get predictive alerts
export async function getAlerts(companyId: string): Promise<BrainAlert[]> {
  const data = (await brainFetch(`/predict/${BRAIN_WORKSPACE}`)) as {
    alerts?: Array<{ id: string; content: string; probability: number; resolved: boolean; created_at: string }>;
  } | null;

  if (!data?.alerts) return [];

  return data.alerts.map((a) => ({
    id: a.id,
    content: a.content,
    probability: a.probability,
    resolved: a.resolved,
    createdAt: a.created_at,
  }));
}

// Hook 6: Process uploaded document
export async function processDocument(docId: string, content: string): Promise<void> {
  await brainFetch("/memory/store", {
    workspace_id: BRAIN_WORKSPACE,
    content: `[Document ${docId}] ${content.slice(0, 5000)}`,
    source_trust: 0.9,
  });
}
