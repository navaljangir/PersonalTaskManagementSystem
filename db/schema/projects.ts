import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdAt,  updatedAt } from "../schemaHelper";
import { users } from "./users";
import { tasks } from "./tasks";
import { relations } from "drizzle-orm";

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    createdAt,
    updatedAt,
  });

export const projectRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  tasks: many(tasks),
}));