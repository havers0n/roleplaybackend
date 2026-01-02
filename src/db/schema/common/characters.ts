import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { common, users } from "./users";
import { tenants } from "./tenants";

export const characters = common.table("characters", {
    id: uuid("id").primaryKey().defaultRandom(),
    tenantId: uuid("tenant_id")
        .notNull()
        .references(() => tenants.id),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
