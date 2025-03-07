import httpStatusCode from "http-status-codes";
import { logger } from "@utils/logger";

interface ErrorOptions {
    name: string;
    info: string;
    httpStatusCode: number;
    isOperational: boolean;
}

interface SerializedErrors {
    message: string;
    info?: string;
    field?: string;
}

export abstract class GeneralError extends Error {
    public readonly name: string;
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    /**
     *
     * @param {ErrorOptions} options
     */
    constructor(options: ErrorOptions) {
        super(options.info);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = options.name;
        this.statusCode = options.httpStatusCode;
        this.isOperational = options.isOperational;
        Error.captureStackTrace(this);
    }

    abstract getErrors(): SerializedErrors[];
}

export class ApiError extends GeneralError {
    /**
     *
     * @param {ErrorOptions} options
     */
    constructor(
        options: ErrorOptions = {
            isOperational: true,
            name: "Internal Server Error",
            info: "Something went wrong.",
            httpStatusCode: httpStatusCode.INTERNAL_SERVER_ERROR,
        }
    ) {
        super(options);
    }

    /**
     *
     * @returns {SerializedErrors[]}
     */
    getErrors(): SerializedErrors[] {
        return [{ message: this.message }];
    }
}

export class NotFoundError extends ApiError {
    /**
     *
     * @param msg
     */
    constructor(msg:string){
       const options: ErrorOptions = {
            isOperational: true,
            name: "Not Found",
            info: msg,
            httpStatusCode: httpStatusCode.NOT_FOUND,
        };
        super(options);
    }
}

export class ValidationError extends ApiError {
    private errors: SerializedErrors[];
    /**
     *
     * @param errors
     */
    constructor(errors:SerializedErrors[]){
        const options: ErrorOptions = {
            isOperational: true,
            name: "Validation Error",
            info: "Validation Error",
            httpStatusCode: httpStatusCode.UNPROCESSABLE_ENTITY,
        };
        super(options);
        this.errors = errors;
    }
    /**
     *
     * @returns {SerializedErrors[]}
     */
    getErrors(): SerializedErrors[] {
        return this.errors;
    }
}

export class ErrorHandler {
    /**
     *
     * @param {Error} error
     */
    static handleError(error: Error) {
        const err: Record<string, unknown> = {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
        if (error instanceof GeneralError) {
            err.errors = error.getErrors();
            err.status = error.statusCode;
            err.isOperational = error.isOperational;
        }
        logger.error(err);
        // do other stuffs e.g: send errors to some centralized servers
    }

    /**
     *
     * @param {Error} error
     * @returns {boolean}
     */
    static isTrustedError(error: Error): boolean {
        if (error instanceof GeneralError) {
            return error.isOperational;
        }
        return false;
    }
}