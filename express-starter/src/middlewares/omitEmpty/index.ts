import { Request, Response, NextFunction } from "express";
import omitEmpty from "omit-empty";

import { MiddlewareFunction } from "@utils/types";

/**
 * removes undefined/null properties from the request object
 * @returns {MiddlewareFunction}
 */
export const removeNullAndEmptyProperties =
  (): MiddlewareFunction<void> =>
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = omitEmpty({ ...req.body }) as Request["body"];
    req.headers = omitEmpty({ ...req.headers }) as Request["headers"];
    req.params = omitEmpty({ ...req.params }) as Request["params"];
    req.query = omitEmpty({ ...req.query }) as Request["query"];
    next();
  };
