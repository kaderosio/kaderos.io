import { pgTable, uuid, text, timestamp, boolean, integer, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { companies, departments } from "./companies";

export const agentStatusEnum = pgEnum("agent_status", ["active", "standby", "paused", "terminated"]);
export const agentTypeEnum = pgEnum("agent_type", ["claude", "gpt", "codex", "cursor", "bash", "http", "custom"]);

export const agents = pgTable("agents", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  departmentId: uuid("department_id").references(() => departments.id),
  reportsToId: uuid("reports_to_id"),

  name: text("name").notNull(),
  avatar: text("avatar").default(""),
  role: text("role").notNull(),
  jobDescription: text("job_description"),
  systemPrompt: text("system_prompt"),

  type: agentTypeEnum("type").notNull().default("claude"),
  status: agentStatusEnum("status").notNull().default("active"),
  version: text("version").default("v1"),

  config: jsonb("config").default({}),
  parameters: jsonb("parameters").default({}), // JSON Schema for run parameters
  skills: jsonb("skills").default([]),
  focus: text("focus"),

  openTasks: integer("open_tasks").default(0),
  completedTasks: integer("completed_tasks").default(0),

  accentColor: text("accent_color").default("#3739C1"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
