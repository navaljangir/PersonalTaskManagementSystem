import { integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

export const taskStatus = ['pending' , 'progress' , 'completed'] as const
export type taskStatusType = (typeof taskStatus)[number]
export const taskStatusEnum = pgEnum(
  'task_status',
  taskStatus
)

export const priorityStatus = ['low','medium','high'] as const
export type priorityType = (typeof priorityStatus)[number]
export const priorityEnum = pgEnum(
  'priority_status',
  priorityStatus
)

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    status: taskStatusEnum().default('pending'), 
    priority: priorityEnum().default("low"), // low, medium, high
    dueDate: timestamp("due_date"),
    createdAt,
    updatedAt
  });


export const taskRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
}));