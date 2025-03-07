/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";

export interface MiddlewareFunction<T> {
  (req: Request, res: Response, next: NextFunction): T | Promise<T>;
}

export interface CustomFunction<T> {
  (...args: unknown[]): T;
}
