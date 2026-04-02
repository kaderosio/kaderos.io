import { pgTable, uuid, text, timestamp, integer, boolean, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const heartbeatStatusEnum = pgEnum("heartbeat_status", ["scheduled", "running", "completed", "failed"]);

export const heartbeats = pgTable("heartbeats", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").notNull().references(() => agents.id),

  cronExpression: text("cron_expression"), // e.g. "0 */2 * * *"
  isEnabled: boolean("is_enabled").default(true).notNull(),

  lastRunAt: timestamp("last_run_at"),
  nextRunAt: timestamp("next_run_at"),
  status: heartbeatStatusEnum("status").default("scheduled"),

  lastResult: jsonb("last_result").default({}),
  runCount: integer("run_count").default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const heartbeatRuns = pgTable("heartbeat_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  heartbeatId: uuid("heartbeat_id").notNull().references(() => heartbeats.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").notNull().references(() => agents.id),

  status: heartbeatStatusEnum("status").notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),

  tokensUsed: integer("tokens_used"),
  output: jsonb("output").default({}),
  error: text("error"),
});
