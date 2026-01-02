import { text, timestamp, uuid, unique } from "drizzle-orm/pg-core";
import { common } from "./users";
import { tenants } from "./tenants";

export const organizations = common.table(
    "organizations",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        tenantId: uuid("tenant_id")
            .notNull()
            .references(() => tenants.id),
        code: text("code").notNull(),
        name: text("name").notNull(),
        orgType: text("org_type").notNull().default("public"),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    },
    (t) => [unique().on(t.tenantId, t.code)]
);
