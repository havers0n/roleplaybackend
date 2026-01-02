import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../../shared/errors/index.js";
import { db } from "../../../db/client.js";
import { tenants } from "../../../db/schema/index.js";
import { eq } from "drizzle-orm";

declare global {
    namespace Express {
        interface Request {
            tenant?: {
                id: string;
                code: string;
            };
        }
    }
}

export const tenantMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tenantCode = (req.headers["x-tenant-code"] as string) || "default";

        const tenant = await db.query.tenants.findFirst({
            where: eq(tenants.code, tenantCode),
            columns: {
                id: true,
                code: true,
                name: true,
            },
        });

        if (!tenant) {
            throw new NotFoundError(`Tenant not found: ${tenantCode}`);
        }

        req.tenant = {
            id: tenant.id,
            code: tenant.code,
        };

        next();
    } catch (error) {
        next(error);
    }
};
