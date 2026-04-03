import { pgTable, uuid, text, timestamp, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const connectorCredentials = pgTable(
  "connector_credentials",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
    userId: uuid("user_id").notNull(),
    provider: text("provider").notNull(),
    label: text("label"),
    credentialType: text("credential_type").notNull().default("api_key"),
    encryptedValue: jsonb("encrypted_value").notNull(),
    valueSha256: text("value_sha256").notNull(),
    metadata: jsonb("metadata").default({}),
    isActive: text("is_active").notNull().default("true"),
    lastTestedAt: timestamp("last_tested_at"),
    lastTestResult: text("last_test_result"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    companyProviderIdx: index("cc_company_provider_idx").on(table.companyId, table.provider),
    companyProviderUq: uniqueIndex("cc_company_provider_uq").on(table.companyId, table.provider, table.userId),
  }),
);
