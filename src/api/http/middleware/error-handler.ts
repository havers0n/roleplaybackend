import { Request, Response, NextFunction } from "express";
import { AppError, ValidationError } from "../../../shared/errors/index.js";
import { ErrorResponse } from "../../../shared/http/error-response.js";
import { ZodError } from "zod";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    let statusCode = 500;
    let errorBody: ErrorResponse["error"] = {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
    };

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        errorBody = {
            code: err.code,
            message: err.message,
            details: err.details,
        };
    } else if (err instanceof ZodError) {
        const validationError = new ValidationError("Validation Error", err.issues);
        statusCode = validationError.statusCode;
        errorBody = {
            code: validationError.code,
            message: validationError.message,
            details: validationError.details,
        };
    } else if (err instanceof Error) {
        // In dev/test we might want to leak details, but let's stick to safe defaults or provided message
        errorBody.message = err.message;
    }

    const response: ErrorResponse = {
        error: errorBody,
        requestId: req.requestId,
    };

    res.status(statusCode).json(response);
};
