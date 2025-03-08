/* eslint-disable no-unused-vars */

import { CustomFunction } from "@utils/types";
import {
  createLogger,
  ILoggerOptions,
  Logger as wLogger,
  LogLevels,
} from "./winstonLogger";

export type { ILoggerOptions, LogLevels };

export interface LogOptions extends ILoggerOptions {
  metaProvider?: CustomFunction<Record<string, unknown>>;
}
export class Logger {
  private readonly _logger: wLogger;
  private readonly _getMetas: CustomFunction<Record<string, unknown>> | undefined;

  /**
   *
   * @param {LogOptions} options
   */
  constructor(options: LogOptions) {
    this._getMetas = options.metaProvider || undefined;
    this._logger = createLogger(options);
  }
  /**
   *
   * @param {unknown} info
   * @param {string} msg
   * @param {string} filename
   */
  public error(info: unknown, msg?: string, filename?: string): void {
    this.log("error", info, msg, filename);
  }

  /**
   *
   * @param {unknown} info
   * @param {string} msg
   * @param {string} filename
   */
  public warn(info: unknown, msg?: string, filename?: string): void {
    this.log("warn", info, msg, filename);
  }

  /**
   *
   * @param {unknown} info
   * @param {string} msg
   * @param {string} filename
   */
  public info(info: unknown, msg?: string, filename?: string): void {
    this.log("info", info, msg, filename);
  }

  /**
   *
   * @param {unknown} info
   * @param {string} msg
   * @param {string} filename
   */
  public http(info: unknown, msg?: string, filename?: string): void {
    this.log("http", info, msg, filename);
  }

  /**
   *
   * @param {unknown} info
   * @param {string} msg
   * @param {string} filename
   */
  public debug(info: unknown, msg?: string, filename?: string): void {
    this.log("debug", info, msg, filename);
  }

  /**
   *
   * @param {LogLevels} level
   * @param {unknown} info
   * @param {string} msg
   * @param {string} filename
   */
  private log(
    level: LogLevels,
    info: unknown,
    msg: string = "",
    filename?: string
  ): void {
    if (typeof info === "string") {
      try {
        info = JSON.parse(info);
      } catch (err) {
        // do nothing so that the code after if block continues
      }
    }
    let logObject = { filename };
    if (typeof this._getMetas === "function") {
      logObject = { ...logObject, ...this._getMetas() };
    }
    if (typeof info === "object" && !Array.isArray(info)) {
      this._logger[level](msg, {
        ...logObject,
        ...info,
      });
      return;
    }
    this._logger[level](msg, {
      ...logObject,
      info,
    });
  }
}

export default Logger;
