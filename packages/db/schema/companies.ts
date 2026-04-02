import { pgTable, uuid, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  mission: text("mission"),
  description: text("description"),
  locale: text("locale").default("de-CH").notNull(),
  currency: text("currency").default("CHF").notNull(),
  timezone: text("timezone").default("Europe/Zurich").notNull(),
  settings: jsonb("settings").default({}),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  leadAgentId: uuid("lead_agent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
