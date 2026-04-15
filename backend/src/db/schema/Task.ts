import { integer, pgEnum, pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { subjects } from "./Subject";
import { users } from "./User";
import { notifications } from "./Notification";
import { studyPlans } from "./StudyPlan";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  subjectId: uuid("subject_id")
    .references(() => subjects.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date", { mode: "date" }),
  difficulty: difficultyEnum("difficulty"),
  duration: integer("duration"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "date"}).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date"})
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const taskRelations = relations(tasks, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [tasks.subjectId],
    references: [subjects.id],
  }),
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
  notifications: many(notifications),
  studyPlans: many(studyPlans),
}));

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;