import { pgTable, uuid, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const auditTrail = pgTable("audit_trail", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").references(() => agents.id),

  action: text("action").notNull(),
  category: text("category").notNull(), // "task", "budget", "deploy", "outreach", "config"
  logic: jsonb("logic").default([]),
  confidence: integer("confidence"),

  metadata: jsonb("metadata").default({}),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
