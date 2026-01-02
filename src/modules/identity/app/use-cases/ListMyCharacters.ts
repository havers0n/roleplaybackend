import { RequestContext } from "../../../../api/http/context.js";
import { UsersRepo } from "../../infra/repos/users.repo.js";
import { CharactersRepo } from "../../infra/repos/characters.repo.js";
import { CharactersListResponse } from "../../contracts/me.contracts.js";

export class ListMyCharacters {
    static async execute(ctx: RequestContext): Promise<CharactersListResponse> {
        // Ensure user exists
        const user = await UsersRepo.upsertByAuth(ctx.auth.provider, ctx.auth.subject);

        const items = await CharactersRepo.listByUserInTenant(user.id, ctx.tenant.id);

        return { items };
    }
}
