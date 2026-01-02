import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized", details?: unknown) {
        super(message, 401, "UNAUTHORIZED", details);
    }
}
