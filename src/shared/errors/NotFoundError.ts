import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
    constructor(message: string = "Not Found", details?: unknown) {
        super(message, 404, "NOT_FOUND", details);
    }
}
