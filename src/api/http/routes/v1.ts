import { Router } from "express";
import { identityController } from "../controllers/identity.controller.js";

export const v1Router = Router();

v1Router.get("/me", identityController.getMe);
v1Router.get("/me/characters", identityController.listMyCharacters);
v1Router.get("/me/memberships", identityController.listMyMemberships);
