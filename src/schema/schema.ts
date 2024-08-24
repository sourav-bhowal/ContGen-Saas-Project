import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("ai_output", {
  id: serial("id").primaryKey(),
  formData: varchar("formData", { length: 1000 }).notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});
