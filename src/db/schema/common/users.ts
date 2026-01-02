import { pgSchema, text, timestamp, uuid, unique } from "drizzle-orm/pg-core";

export const common = pgSchema("common");

export const users = common.table(
    "users",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        authProvider: text("auth_provider").notNull(),
        authSubject: text("auth_subject").notNull(),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    },
    (t) => [unique().on(t.authProvider, t.authSubject)]
);
