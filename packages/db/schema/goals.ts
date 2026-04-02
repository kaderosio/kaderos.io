import { pgTable, uuid, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const goalStatusEnum = pgEnum("goal_status", ["on-track", "at-risk", "behind", "completed"]);

export const goals = pgTable("goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  parentGoalId: uuid("parent_goal_id"),
  ownerAgentId: uuid("owner_agent_id").references(() => agents.id),

  title: text("title").notNull(),
  description: text("description"),
  department: text("department"),

  progress: integer("progress").default(0).notNull(),
  status: goalStatusEnum("status").notNull().default("on-track"),

  deadline: text("deadline"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
