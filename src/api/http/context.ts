import { Request, Response, NextFunction } from "express";

export interface RequestContext {
    requestId: string;
    auth: {
        provider: string;
        subject: string;
    };
    tenant: {
        id: string;
        code: string;
    };
}

declare global {
    namespace Express {
        interface Request {
            ctx: RequestContext;
        }
    }
}

export const contextMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Assumes authn and tenant middlewares have run
    if (!req.auth || !req.tenant) {
        // Should be handled by prior middlewares, but safety check
        console.error("Context middleware called without auth/tenant");
        // We could throw here, but let's assume they might be optional in some cases or handled by error handler?
        // User requirement: "context middleware assembles ctx from req fields"
        // req.auth and req.tenant are attached by authn and tenant middlewares.
    }

    req.ctx = {
        requestId: req.requestId,
        auth: req.auth!, // strict? The prompt says types are strict.
        tenant: req.tenant!,
    };
    next();
};
