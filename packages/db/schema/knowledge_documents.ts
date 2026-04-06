import { pgTable, uuid, text, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const knowledgeDocuments = pgTable("knowledge_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  fileType: text("file_type").notNull(), // pdf, txt, csv, url
  sizeBytes: integer("size_bytes"),
  status: text("status").notNull().default("uploaded"), // uploaded, processing, ready, error
  agentIds: jsonb("agent_ids").default([]),
  storagePath: text("storage_path"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
