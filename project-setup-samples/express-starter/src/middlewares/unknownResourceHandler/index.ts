import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "@lib/error";
import { MiddlewareFunction } from "@utils/types";

/**
 *
 * @returns {MiddlewareFunction}
 */
export const unknownResourceHandler =
  (): MiddlewareFunction<void> =>
  (_req: Request, _res: Response, _next: NextFunction) => {
    throw new NotFoundError("Requested Resource not found");
  };
