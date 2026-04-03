import { createClient } from "@/utils/supabase/server";

interface LogActivityInput {
  companyId: string;
  actorType: "user" | "agent" | "system";
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  agentId?: string;
  details?: Record<string, unknown>;
}

export async function logActivity(input: LogActivityInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("activity_log").insert({
    company_id: input.companyId,
    actor_type: input.actorType,
    actor_id: input.actorId,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId,
    agent_id: input.agentId ?? null,
    details: input.details ?? {},
  });
  if (error) {
    console.error("Failed to log activity:", error);
  }
}
