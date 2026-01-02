import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../../shared/errors/index.js";

declare global {
    namespace Express {
        interface Request {
            auth?: {
                provider: string;
                subject: string;
            };
        }
    }
}

export const authnMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Missing or invalid Authorization header");
    }

    const token = authHeader.split(" ")[1];

    // Placeholder: provider="dev", subject=token
    req.auth = {
        provider: "dev",
        subject: token,
    };

    next();
};
