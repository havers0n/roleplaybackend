import { db } from "../../../../db/client.js";
import { characters } from "../../../../db/schema/index.js";
import { eq, and } from "drizzle-orm";

export class CharactersRepo {
    static async listByUserInTenant(userId: string, tenantId: string) {
        return db
            .select({
                id: characters.id,
                firstName: characters.firstName,
                lastName: characters.lastName,
            })
            .from(characters)
            .where(
                and(eq(characters.userId, userId), eq(characters.tenantId, tenantId))
            );
    }
}
