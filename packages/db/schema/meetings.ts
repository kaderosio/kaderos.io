import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { agents } from "./agents";

export const meetingMessages = pgTable("meeting_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").references(() => agents.id),

  sessionId: text("session_id").notNull(),
  role: text("role").notNull(), // "user" | "assistant"
  content: text("content").notNull(),
  metadata: jsonb("metadata").default({}),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
