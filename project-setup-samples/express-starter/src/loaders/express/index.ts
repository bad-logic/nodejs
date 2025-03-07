import { Application, json } from "express";
import compression from "compression";
import helmet from "helmet";
import httpContext from "express-http-context";
import { router } from "../../routes/";

import {
  injectRequestId,
  removeNullAndEmptyProperties,
  handleIfMaintenanceMode,
  handleCors,
  expressErrorHandler,
  unknownResourceHandler,
  morganLogger,
} from "@middlewares";

/**
 *
 * @param {Application} app
 * @returns {Application}
 *
 */
export const ExpressLoader = (app: Application): void => {
  app
    .use(helmet())
    .use(handleCors())
    .use(compression())
    .use(json())
    .use(httpContext.middleware)
    .use(injectRequestId())
    .use(morganLogger())
    .set("trust proxy", 1) // Tell the backend it is behind a proxy and has no direct https connection
    .use(handleIfMaintenanceMode())
    .use(removeNullAndEmptyProperties())
    .use(router)
    .use(unknownResourceHandler())
    .use(expressErrorHandler());
};
