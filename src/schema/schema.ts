import { boolean, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("ai_output", {
  id: serial("id").primaryKey(),
  formData: varchar("formData", { length: 1000 }).notNull(),
  aiResponse: text("aiResponse").notNull(),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const UserSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  userName: varchar("userName", { length: 255 }).notNull(),
  active: boolean("active").notNull(),
  paymentId: varchar("paymentId", { length: 255 }).notNull(),
  joinDate: timestamp("joinDate").defaultNow().notNull(),
});