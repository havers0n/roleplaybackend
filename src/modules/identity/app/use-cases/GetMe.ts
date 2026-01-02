import { RequestContext } from "../../../../api/http/context.js";
import { UsersRepo } from "../../infra/repos/users.repo.js";
import { MeResponse } from "../../contracts/me.contracts.js";

export class GetMe {
    static async execute(ctx: RequestContext): Promise<MeResponse> {
        const user = await UsersRepo.upsertByAuth(ctx.auth.provider, ctx.auth.subject);

        // We don't have "activeCharacterId" logic yet, returning null as per contract placeholder possibility
        // The user schema doesn't have active_character_id column.

        return {
            userId: user.id,
            tenantId: ctx.tenant.id,
            tenantCode: ctx.tenant.code,
            activeCharacterId: null,
        };
    }
}
