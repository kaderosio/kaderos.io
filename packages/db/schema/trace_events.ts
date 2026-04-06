import { pgTable, uuid, text, timestamp, integer, numeric, jsonb } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const traceEvents = pgTable("trace_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").references(() => agents.id),
  runId: text("run_id"),
  eventType: text("event_type").notNull(), // llm_call, tool_call, decision, error
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  model: text("model"),
  adapterType: text("adapter_type"),
  costChf: numeric("cost_chf", { precision: 10, scale: 4 }),
  durationMs: integer("duration_ms"),
  inputPreview: text("input_preview"),
  outputPreview: text("output_preview"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
