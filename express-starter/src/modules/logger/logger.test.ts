import { before,after, describe, it, mock, Mock } from "node:test";
import assert from "node:assert";

import winston from "winston";

import Logger from "./";

describe("logger module", () => {
  let createLogger: Mock<typeof mock.fn>;
  before(() => {
    createLogger = mock.fn(()=>{
      return {
        debug: mock.fn(),
        error: mock.fn(),
        http: mock.fn(),
        info: mock.fn(),
        warn: mock.fn(),
      }
    });
    mock.method(winston,"createLogger",createLogger);
  });

  after(()=>{
    mock.reset();
  })

  it("should call winston.createLogger", () => {
    new Logger({
      deploymentEnvironment: "dev" as any,
    });
    assert.strictEqual( createLogger.mock.callCount(),1);
  });

  for (let level of ["debug", "error", "info", "http", "warn"]) {
    describe(`calls logger.${level}()`, () => {
      it(`should call logger.${level}() method`, (t) => {
        const loggerInstance = new Logger({
          deploymentEnvironment: "dev" as any,
        });
        const mocked = t.mock.method(loggerInstance,level as keyof Logger)
        loggerInstance?.[level as keyof Logger]("111");
        assert.strictEqual(mocked.mock.callCount(),1);
      });

      it(`calling logger.${level}() should also call metaProvider method`, () => {
        const metaProvider = mock.fn(()=>{
          return {}
        });
        const loggerInstance = new Logger({
          deploymentEnvironment: "dev" as any,
          metaProvider: metaProvider,
        });
        loggerInstance?.[level as keyof Logger]("000");
        assert.strictEqual(metaProvider.mock.callCount(),1);
      });
    });
  }
});