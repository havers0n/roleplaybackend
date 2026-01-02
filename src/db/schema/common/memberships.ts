import { text, timestamp, uuid, unique } from "drizzle-orm/pg-core";
import { common } from "./users";
import { tenants } from "./tenants";
import { characters } from "./characters";
import { organizations } from "./organizations";

export const memberships = common.table(
    "memberships",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        tenantId: uuid("tenant_id")
            .notNull()
            .references(() => tenants.id),
        characterId: uuid("character_id")
            .notNull()
            .references(() => characters.id),
        organizationId: uuid("organization_id")
            .notNull()
            .references(() => organizations.id),
        rankCode: text("rank_code"),
        statusCode: text("status_code").notNull().default("active"),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    },
    (t) => [unique().on(t.tenantId, t.characterId, t.organizationId)]
);
