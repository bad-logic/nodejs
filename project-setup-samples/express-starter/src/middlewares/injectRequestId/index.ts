import { Request, Response, NextFunction } from "express";
import httpContext from "express-http-context";
import { v4 as uuidV4 } from "uuid";

import { MiddlewareFunction } from "@utils/types";

/**
 * Injects a unique request id into the request object
 * @returns {MiddlewareFunction}
 */
export const injectRequestId =
  (): MiddlewareFunction<void> =>
  (_req: Request, res: Response, next: NextFunction) => {
    // @TODO for future cases add the pods id/ service id also in the header of req and response
    // so we know whose logs to see for the error
    const requestId = uuidV4();
    res.setHeader("request-Id", requestId);
    httpContext.set("requestId", requestId);
    next();
  };
