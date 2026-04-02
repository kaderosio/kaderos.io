import { pgTable, uuid, text, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";

export const kaderTemplates = pgTable("kader_templates", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  category: text("category"), // "agency", "solo", "kmu", "treuhand", "consulting"
  locale: text("locale").default("de-CH"),

  agentCount: integer("agent_count").default(0),
  config: jsonb("config").notNull(), // Full company + agents + goals template
  preview: jsonb("preview").default({}),

  isOfficial: boolean("is_official").default(false),
  isPublished: boolean("is_published").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
