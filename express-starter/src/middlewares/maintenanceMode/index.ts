import { NextFunction, Request, Response } from "express";
import httpStatusCode from "http-status-codes";

import { MiddlewareFunction } from "@utils/types";
import { environment } from "@lib/environment";

/**
 *
 * @returns {MiddlewareFunction}
 */
export const handleIfMaintenanceMode =
  (): MiddlewareFunction<void> =>
  (_req: Request, res: Response, next: NextFunction):void => {
    if (environment.underMaintenance) {
       res
        .status(httpStatusCode.SERVICE_UNAVAILABLE)
        .send("Service unavailable due to maintenance");
      return;
    }
    next();
  };
