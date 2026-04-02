import { pgTable, uuid, text, timestamp, integer, jsonb, pgEnum, date, boolean } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const taskPriorityEnum = pgEnum("task_priority", ["high", "medium", "low"]);
export const taskStatusEnum = pgEnum("task_status", ["todo", "in-progress", "review", "done", "blocked"]);

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").references(() => agents.id),
  parentTaskId: uuid("parent_task_id"),

  title: text("title").notNull(),
  description: text("description"),
  priority: taskPriorityEnum("priority").notNull().default("medium"),
  status: taskStatusEnum("status").notNull().default("todo"),

  department: text("department"),
  tags: jsonb("tags").default([]),
  dueDate: date("due_date"),

  sprintId: uuid("sprint_id"),
  goalId: uuid("goal_id"),

  estimatedMinutes: integer("estimated_minutes"),
  actualMinutes: integer("actual_minutes"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const taskComments = pgTable("task_comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  taskId: uuid("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").references(() => agents.id),
  content: text("content").notNull(),
  isSystem: boolean("is_system").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
