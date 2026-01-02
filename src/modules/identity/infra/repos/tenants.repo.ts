import { db } from "../../../../db/client.js";
import { tenants } from "../../../../db/schema/index.js";
import { eq } from "drizzle-orm";

export class TenantsRepo {
    static async findByCode(code: string) {
        return db.query.tenants.findFirst({
            where: eq(tenants.code, code),
            columns: {
                id: true,
                code: true,
                name: true,
            },
        });
    }
}
