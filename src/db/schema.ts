import {
  uniqueIndex,
  pgTable,
  varchar,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    firebase_uid: varchar("firebase_uid", { length: 256 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    lastname: varchar("lastname", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 100 }).unique(),
    profileImage: varchar("profile_image", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("users_email_index").on(table.email),
    };
  }
);

export const schema = {
  user: usersTable,
};
