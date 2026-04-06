import { pgTable, uuid, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const workflows = pgTable("workflows", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  triggerType: text("trigger_type").notNull().default("manual"), // manual, cron, webhook
  cronExpression: text("cron_expression"),
  webhookSecret: text("webhook_secret"),
  isEnabled: boolean("is_enabled").default(true),
  status: text("status").notNull().default("draft"), // draft, active, paused
  lastRunAt: timestamp("last_run_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workflowSteps = pgTable("workflow_steps", {
  id: uuid("id").defaultRandom().primaryKey(),
  workflowId: uuid("workflow_id").notNull().references(() => workflows.id, { onDelete: "cascade" }),
  position: integer("position").notNull(),
  stepType: text("step_type").notNull().default("agent_run"), // agent_run, human_approval, conditional, delay
  agentId: uuid("agent_id").references(() => agents.id),
  promptTemplate: text("prompt_template"),
  config: jsonb("config").default({}),
  timeoutMinutes: integer("timeout_minutes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workflowRuns = pgTable("workflow_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  workflowId: uuid("workflow_id").notNull().references(() => workflows.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("pending"), // pending, running, waiting_approval, completed, failed
  trigger: text("trigger").notNull().default("manual"),
  input: jsonb("input").default({}),
  output: jsonb("output").default({}),
  currentStep: integer("current_step").default(0),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  error: text("error"),
});

export const workflowStepRuns = pgTable("workflow_step_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  workflowRunId: uuid("workflow_run_id").notNull().references(() => workflowRuns.id, { onDelete: "cascade" }),
  stepId: uuid("step_id").notNull().references(() => workflowSteps.id),
  status: text("status").notNull().default("pending"),
  input: jsonb("input").default({}),
  output: jsonb("output").default({}),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  error: text("error"),
  approvedBy: text("approved_by"),
});
