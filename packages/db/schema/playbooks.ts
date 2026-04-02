import { pgTable, uuid, text, timestamp, integer, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const playbookStatusEnum = pgEnum("playbook_status", ["active", "beta", "archived"]);

export const playbooks = pgTable("playbooks", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  description: text("description"),
  status: playbookStatusEnum("playbook_status").notNull().default("beta"),

  rules: jsonb("rules").default([]),
  rulesCount: integer("rules_count").default(0),

  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
