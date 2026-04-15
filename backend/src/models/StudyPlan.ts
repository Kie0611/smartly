import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { tasks } from "./Task";
import { users } from "./User";

export const studyPlans = pgTable("study_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  taskId: uuid("task_id")
    .references(() => tasks.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  scheduledStart: timestamp("scheduled_start", { mode: "date" }).notNull(),
  scheduledEnd: timestamp("scheduled_end", { mode: "date" }).notNull(),
  completedAt: timestamp("completed_at", { mode: "date" }),
});

export const studyPlanRelations = relations(studyPlans, ({ one }) => ({
  task: one(tasks, {
    fields: [studyPlans.taskId],
    references: [tasks.id]
  }),
  user: one(users, {
    fields: [studyPlans.userId],
    references: [users.id]
  })
}));

export type StudyPlan = typeof studyPlans.$inferSelect;
export type NewStudyPlan = typeof studyPlans.$inferInsert;