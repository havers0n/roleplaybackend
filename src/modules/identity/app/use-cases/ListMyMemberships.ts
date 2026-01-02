import { RequestContext } from "../../../../api/http/context.js";
import { UsersRepo } from "../../infra/repos/users.repo.js";
import { MembershipsRepo } from "../../infra/repos/memberships.repo.js";
import { MembershipsListResponse } from "../../contracts/me.contracts.js";

export class ListMyMemberships {
    static async execute(ctx: RequestContext): Promise<MembershipsListResponse> {
        // Ensure user exists
        const user = await UsersRepo.upsertByAuth(ctx.auth.provider, ctx.auth.subject);

        const items = await MembershipsRepo.listByUserInTenant(user.id, ctx.tenant.id);

        return { items };
    }
}
