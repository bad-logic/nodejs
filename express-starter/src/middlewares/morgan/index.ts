import { Request, Response } from "express";
import morgan, { StreamOptions, TokenIndexer, FormatFn } from "morgan";

import { MiddlewareFunction } from "@utils/types";
import { logger } from "@utils/logger";

const stream: StreamOptions = {
  write: (info) => {
    logger.http(info);
  },
};

/**
 *
 * @param {TokenIndexer} tokens
 * @param {Request} req
 * @param {Response} res
 * @returns {string}
 */
const morganCallback: FormatFn<Request, Response> = (
  tokens: TokenIndexer<Request, Response>,
  req: Request,
  res: Response
): string => {
  const args = {
    "http-version": tokens["http-version"](req, res),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    "remote-addr": tokens["remote-addr"](req, res),
    "remote-user": tokens["remote-user"](req, res),
    "response-time-ms": tokens["response-time"](req, res),
    referrer: tokens["referrer"](req, res),
    "user-agent": tokens["user-agent"](req, res),
    "content-length": tokens.res(req, res, "content-length"),
  };
  return JSON.stringify(args);
};

/**
 *
 * @returns {MiddlewareFunction}
 */
export const morganLogger = (): MiddlewareFunction<unknown> =>
  morgan(morganCallback, { stream });
