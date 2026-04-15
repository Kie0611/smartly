import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { studyPlans } from "./StudyPlan";
import { notifications } from "./Notification";
import { tasks } from "./Task";
import { subjects } from "./Subject";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  subjects: many(subjects),
  tasks: many(tasks),
  notifications: many(notifications),
  studyPlans: many(studyPlans),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

