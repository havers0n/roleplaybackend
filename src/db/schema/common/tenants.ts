import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { common } from "./users";

export const tenants = common.table("tenants", {
    id: uuid("id").primaryKey().defaultRandom(),
    code: text("code").notNull().unique(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
