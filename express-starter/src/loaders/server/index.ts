import http, { Server } from "http";
import { Application } from "express";
import { environment } from "@lib/environment";
import { ErrorHandler } from "@lib/error";

const options = { coredump: false, timeout: 1000 };

/**
 *
 * @param {number} code exit code
 * @returns {void}
 *
 */
const exit = (code: number): void => {
    if (options.coredump) {
        process.abort();
    } else {
        process.exit(code);
    }
};

/**
 *
 * @param {Server} server http server
 * @returns {void}
 *
 */
const gracefulShutdown = (server: Server): (_:number)=>void => (code: number): void => {

  server.close(() => {
    exit(code);
  });

  // wait options.timeout ms for cleanup if any pending requests or connections needs to be closed

  // Normally, an active setTimeout keeps the process running, even if all other work is complete.
  // By calling .unref(), the process can exit naturally if there is nothing else keeping the event loop active.
  // .unref() method ensures that the timer does not keep the Node.js event loop active.
  setTimeout(() => {
    console.error("🔌💥Forcing shutdown after timeout.");
    exit(code);
  }, options.timeout).unref();
};

/**
 *
 * @param {Application} requestHandler
 * @returns {Promise<Server>}
 *
 */
export const ServerLoader = (requestHandler: Application): Promise<Server> =>
  new Promise((resolve, reject) => {
    const apiPort = +(environment.apiPort || 8080);
    const server = http.createServer(requestHandler);
    const shutdownHandler = gracefulShutdown(server);

    // set port to listen on the server
    server.listen(apiPort);

    // when server is 'listening' event is fired log some info
    server.on("listening", () => {
      console.info(`✅ http server started on port ${apiPort}`);
      return resolve(server);
    });

    // handling 'error' event fired by the server
    server.on("error", (error: Error) => {
      console.error(`🛑💻Application Crashed  ${error?.stack?.split("\n")}`);
      return reject(error);
    });

    // handling kill commands
    process.on("SIGTERM", (signal) => {
      console.warn(`⚠️process ${process.pid} received signal ${signal}`);
      shutdownHandler(0);
    });

    process.on("SIGINT", (signal) => {
      console.warn(`⚠️process ${process.pid} received signal ${signal}`);
      shutdownHandler(0);
    });

    
    // prevent promise rejection exits
    process.on(
      "unhandledRejection",
      (reason: Error, _promise: Promise<unknown>) => {
        console.error("❌unhandledRejection", reason, _promise);
        shutdownHandler(1);
      }
    );

    // prevent dirty exit on code-fault crashes
    process.on("uncaughtException", (error: Error) => {
      ErrorHandler.handleError(error);
      // @TODO best idea would be to let it crash 
      // and spawn a new instance or restart using process monitors
      // @TODO remove error trust code and crash the server
      if (!ErrorHandler.isTrustedError(error)) {
        console.error(`🛑💻Application Crashed  ${error?.stack?.split("\n")}`);
        shutdownHandler(1);
      }
    });
  });
