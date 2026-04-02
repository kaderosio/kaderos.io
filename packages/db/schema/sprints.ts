import { pgTable, uuid, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const sprintStatusEnum = pgEnum("sprint_status", ["planned", "active", "done"]);

export const sprints = pgTable("sprints", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  ownerAgentId: uuid("owner_agent_id").references(() => agents.id),

  code: text("code").notNull(), // e.g. "S53"
  title: text("title").notNull(),
  description: text("description"),
  status: sprintStatusEnum("status").notNull().default("planned"),

  totalTasks: integer("total_tasks").default(0),
  completedTasks: integer("completed_tasks").default(0),
  progress: integer("progress").default(0),

  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
