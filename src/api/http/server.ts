import express from "express";
import { requestId } from "../../shared/http/request-id.js";
import { authnMiddleware } from "./middleware/authn.js";
import { tenantMiddleware } from "./middleware/tenant.js";
import { contextMiddleware } from "./context.js";
import { errorHandler } from "./middleware/error-handler.js";
import { v1Router } from "./routes/v1.js";

export const createServer = () => {
    const app = express();

    app.use(express.json());

    app.get("/health", (req, res) => {
        res.json({ status: "ok" });
    });

    // Global Middleware Chain
    app.use(requestId);

    // Mount API
    // Note: Middleware order matters. 
    // We apply auth -> tenant -> context globally for /api/v1 or per route?
    // User prompt says: "middlewares order: requestId -> authn -> tenant -> context -> routes -> error-handler"
    // So we should apply them before routes.

    const apiRouter = express.Router();
    apiRouter.use(authnMiddleware);
    apiRouter.use(tenantMiddleware);
    apiRouter.use(contextMiddleware);

    apiRouter.use(v1Router);

    app.use("/api/v1", apiRouter);

    app.use(errorHandler);

    return app;
};
