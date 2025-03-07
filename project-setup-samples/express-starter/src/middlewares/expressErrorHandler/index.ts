import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { ErrorHandler, GeneralError } from "@lib/error";
import httpStatusCode from "http-status-codes";
import { MiddlewareFunction } from "@utils/types";

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


export const asyncWrapper = (fnc:MiddlewareFunction<unknown>): MiddlewareFunction<void> => async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const data = await fnc(req,res,next);
      res.json(data);
    }catch (err){
      next(err);
    }
};