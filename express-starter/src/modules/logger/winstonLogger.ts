/** Packages */
import winston, { format, Logger } from "winston";
import { DEPLOYMENT_ENVIRONMENT } from "@utils/enums";

const initLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export type LogLevels = "error" | "warn" | "info" | "http" | "debug";

export type { Logger };

export interface ILoggerOptions {
  deploymentEnvironment: DEPLOYMENT_ENVIRONMENT;
  level?: LogLevels;
  levels?: Record<string, number>;
  defaultMeta?: Record<string, unknown>;
}

/**
 *
 * @param {ILoggerOptions} options
 * @returns {Logger}
 */
export const createLogger = (options: ILoggerOptions): Logger => {
  const levels =
    options.levels && Object.keys(options.levels).length > 0
      ? options.levels
      : initLevels;
  const environment = options.deploymentEnvironment ?? DEPLOYMENT_ENVIRONMENT.DEVELOPMENT;
  const level = options.level ?? "debug";

  let loggerOptions = {
    level,
    levels,
    defaultMeta: options.defaultMeta,
    format: format.combine(format.ms(), format.timestamp()),
  };

  if (environment === DEPLOYMENT_ENVIRONMENT.DEVELOPMENT) {
    loggerOptions = {
      level,
      levels,
      defaultMeta: options.defaultMeta,
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:SS:ZZ" }),
        format.ms(),
        format.prettyPrint()
      ),
    };
  }
  return winston.createLogger({
    ...loggerOptions,
    exceptionHandlers: [
      new winston.transports.Console({
        format: format.json(),
      }),
    ],
    transports: [
      new winston.transports.Console({
        format: format.json(),
      }),
    ],
  });
};

export default createLogger;
