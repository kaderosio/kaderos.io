import { pgTable, uuid, text, timestamp, numeric, integer, boolean } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const budgets = pgTable("budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),

  monthlyLimitChf: numeric("monthly_limit_chf", { precision: 10, scale: 2 }).notNull(),
  spentChf: numeric("spent_chf", { precision: 10, scale: 2 }).default("0").notNull(),
  warningThreshold: integer("warning_threshold").default(80).notNull(),

  period: text("period").notNull(), // e.g. "2026-04"
  isPaused: boolean("is_paused").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const costEntries = pgTable("cost_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  budgetId: uuid("budget_id").notNull().references(() => budgets.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").notNull().references(() => agents.id),
  taskId: uuid("task_id"),

  amountChf: numeric("amount_chf", { precision: 10, scale: 4 }).notNull(),
  tokensUsed: integer("tokens_used"),
  model: text("model"),
  description: text("description"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
