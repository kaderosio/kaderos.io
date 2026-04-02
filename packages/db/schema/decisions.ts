import { pgTable, uuid, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const decisionStatusEnum = pgEnum("decision_status", ["pending", "approved", "denied"]);
export const decisionTypeEnum = pgEnum("decision_type", ["budget", "deploy", "outreach", "hire", "config", "other"]);

export const decisions = pgTable("decisions", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").notNull().references(() => agents.id),

  request: text("request").notNull(),
  type: decisionTypeEnum("type").notNull().default("other"),
  confidence: integer("confidence").notNull(),

  status: decisionStatusEnum("status").notNull().default("pending"),
  decidedBy: text("decided_by"),
  reason: text("reason"),

  requestedAt: timestamp("requested_at").defaultNow().notNull(),
  decidedAt: timestamp("decided_at"),
});
