import { Request, Response, NextFunction } from "express";
import { GetMe } from "../../../modules/identity/app/use-cases/GetMe.js";
import { ListMyCharacters } from "../../../modules/identity/app/use-cases/ListMyCharacters.js";
import { ListMyMemberships } from "../../../modules/identity/app/use-cases/ListMyMemberships.js";

export const identityController = {
    getMe: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await GetMe.execute(req.ctx);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    listMyCharacters: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await ListMyCharacters.execute(req.ctx);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    listMyMemberships: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const result = await ListMyMemberships.execute(req.ctx);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },
};
