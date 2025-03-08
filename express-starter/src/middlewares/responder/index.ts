import {NextFunction, Request, Response} from "express";

import {MiddlewareFunction} from "@utils/types";

export const responder = (fnc:MiddlewareFunction<unknown>): MiddlewareFunction<void> => async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const data = await fnc(req,res,next);
        res.json(data);
    }catch (err){
        next(err);
    }
};