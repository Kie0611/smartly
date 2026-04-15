import { db } from "./connection";
import { eq } from "drizzle-orm";
import {
  users,
  subjects,
  tasks,
  notifications,
  studyPlans,
  type NewUser,
  type NewSubject,
  type NewTask,
  type NewNotification,
  type NewStudyPlan,
} from "./index";
import { Email } from "@clerk/backend/dist/api";

// USER QUERIES

export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, id)});
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const existingUser = await getUserById(id);
  if(!existingUser) {
    throw new Error(`User with id: ${id} not found`)
  };

  const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
  return user;
};

// SUBJECT QUERIES

export const createSubject = async (data: NewSubject) => {
  const [subject] = await db.insert(subjects).values(data).returning();
  return subject;
}

export const getAllSubjects = async (id: string) => {
  return await db.query.subjects.findMany({
    where: eq(subjects.userId, id),
  });
};

export const updateSubject = async (id: string, data: Partial<NewSubject>) => {
  const existingSubject = await getAllSubjects(id);
  if(!existingSubject) {
    throw new Error(`Subject with id: ${id} not found`)
  };

  const [subject] = await db.update(subjects).set(data).where(eq(subjects.id, id)).returning();
  return subject;
}

export const deleteSubject = async (id: string) => {
  const existingSubject = await getAllSubjects(id);
  if(!existingSubject) {
    throw new Error(`Subject with id: ${id} not found`)
  };

  const [subject] = await db.delete(subjects).where(eq(subjects.id, id)).returning();
  return subject;
}

// TASK QUERIES

export const createTask = async (data: NewTask) => {
  const [task] = await db.insert(tasks).values(data).returning();
  return task;
};

export const getAllTasks = async (id: string) => {
  return await db.query.tasks.findMany({
    where: eq(tasks.userId, id),
  });
};

export const updateTask = async (id: string, data: Partial<NewTask>) => {
  const existingTask = await getAllTasks(id);
  if(!existingTask) {
    throw new Error(`Task with id: ${id} not found`)
  };

  const [task] = await db.update(tasks).set(data).where(eq(tasks.id, id)).returning();
  return task;
};

export const deleteTask = async (id: string) => {
  const existingTask = await getAllTasks(id);
  if(!existingTask) {
    throw new Error(`Task with id: ${id} not found`)
  };

  const [task] = await db.delete(tasks).where(eq(tasks.id, id)).returning();
  return task;
}

export const completeTask = async (id: string) => {
  const [task] = await db
    .update(tasks)
    .set({ isCompleted: true })
    .where(eq(tasks.id, id))
    .returning();

  return task;
};

// SCHEDULER QUERIES

export const generateStudyPlan = async (data: NewStudyPlan) => {
  const [studyPlan] = await db.insert(studyPlans).values(data).returning();
  return studyPlan;
};

export const getScheduleByUserId = async (id: string) => {
  return await db.query.studyPlans.findMany({
    where: eq(studyPlans.userId, id),
    with: {
      task: true, 
    },
  });
};

// NOTIFICATION QUERIES

export const createNotification = async (data: NewNotification) => {
  const [notification] = await db
    .insert(notifications)
    .values(data)
    .returning();

  return notification;
};

export const getNotificationsByUser = async (userId: string) => {
  return await db.query.notifications.findMany({
    where: eq(notifications.userId, userId),
    with: {
      task: true, 
    },
  });
};

