import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import httpStatusCode from "http-status-codes";

import { ErrorHandler, GeneralError } from "@lib/error";

/**
 *
 * @returns {ErrorRequestHandler}
 */
export const expressErrorHandler =
  (): ErrorRequestHandler =>
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    ErrorHandler.handleError(err);
    if (err instanceof GeneralError && ErrorHandler.isTrustedError(err)) {
      res.status(err.statusCode).json(err.getErrors());
    } else {
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "something went wrong" });
    }
  };