import { db } from "../../../../db/client.js";
import { memberships, organizations, characters } from "../../../../db/schema/index.js";
import { eq, and } from "drizzle-orm";

export class MembershipsRepo {
    static async listByUserInTenant(userId: string, tenantId: string) {
        // We need to join memberships -> characters -> organizations
        // Filter by character.userId and membership.tenantId

        return db
            .select({
                membershipId: memberships.id,
                characterId: memberships.characterId,
                organizationId: memberships.organizationId,
                organizationCode: organizations.code,
                organizationName: organizations.name,
                rankCode: memberships.rankCode,
                statusCode: memberships.statusCode,
            })
            .from(memberships)
            .innerJoin(characters, eq(memberships.characterId, characters.id))
            .innerJoin(organizations, eq(memberships.organizationId, organizations.id))
            .where(
                and(
                    eq(characters.userId, userId),
                    eq(memberships.tenantId, tenantId)
                )
            );
    }
}
