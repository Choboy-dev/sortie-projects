import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";
import { user } from "@/lib/db/schema/auth";

export const talentProfile = mysqlTable("talent_profile", {
  userId: varchar("user_id", { length: 36 })
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  displayName: varchar("display_name", { length: 255 }).notNull(),
  categoryId: varchar("category_id", { length: 64 }).notNull(),
  skills: text("skills").notNull(),
  timezone: varchar("timezone", { length: 64 }).notNull(),
  hoursPerWeek: int("hours_per_week").notNull(),
  availableFrom: varchar("available_from", { length: 32 }),
  rateAmount: int("rate_amount"),
  rateCurrency: varchar("rate_currency", { length: 8 }).notNull().default("USD"),
  admissionStatus: varchar("admission_status", { length: 64 })
    .notNull()
    .default("Applied"),
  onboardingCompletedAt: timestamp("onboarding_completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const companyProfile = mysqlTable("company_profile", {
  userId: varchar("user_id", { length: 36 })
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  website: varchar("website", { length: 512 }),
  hiringTitle: varchar("hiring_title", { length: 255 }).notNull(),
  hiringCategoryId: varchar("hiring_category_id", { length: 64 }).notNull(),
  timezone: varchar("timezone", { length: 64 }).notNull(),
  onboardingCompletedAt: timestamp("onboarding_completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});
