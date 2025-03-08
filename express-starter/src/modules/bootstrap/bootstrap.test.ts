import { describe, it } from 'node:test';
import assert from 'node:assert';

import { bootstrap } from "./index";

const promiseVoid = (): Promise<void> => {
  return Promise.resolve();
};

const promiseBoolean = (): Promise<boolean> => {
  return Promise.resolve(true);
};

const promiseString = (): Promise<string> => {
  return Promise.resolve("hello");
};

const rejectedPromiseString = (): Promise<string> => {
  return Promise.reject("error");
};

describe("testing bootstrap()", () => {

  describe("with then catch", () => {
    it("should resolve successfully", () => {
      bootstrap([promiseString]).then((result) => {
        assert(result.includes("hello"));
      });
    });

    it("should reject successfully", () => {
      bootstrap([rejectedPromiseString]).catch((error) => {
        assert(error==="error");
      });
    });
  });

  describe("with async await ", () => {
    it("should resolve successfully", async () => {
      const result = await bootstrap([promiseString]);
      assert(result.includes("hello"));
    });

    it("should reject successfully", async () => {
      try {
        await bootstrap([rejectedPromiseString]);
      } catch (error) {
        assert(error==="error");
      }
    });
  });

  describe("with different sets of inputs", () => {
    it("should return an array of length 1 with value hello", async () => {
      const result = await bootstrap([promiseString]);
      assert(typeof result==="object");
      assert(result.length === 1);
      assert(result[0]==="hello");
    });

    it("should return an array of length 1 with value true ", async () => {
      const result = await bootstrap([promiseBoolean]);
      assert(typeof result==="object");
      assert(result.length===1);
      assert(result[0]===true);
    });

    it("should return an array of length 1 with value undefined", async () => {
      const voidPromise = await bootstrap([promiseVoid]);
      assert(typeof voidPromise === "object");
      assert(voidPromise.length===1);
      assert(voidPromise[0] === undefined);
    });

    it("should return an array of length 3", async () => {
      const result = await bootstrap([
        promiseString,
        promiseBoolean,
        promiseVoid,
      ]);
      assert(typeof result==="object");
      assert(result.length === 3);
    });

    it("should throw an error if any one of the promise is rejected", async () => {
      try {
        await bootstrap([
          promiseString,
          promiseBoolean,
          promiseVoid,
          rejectedPromiseString,
        ]);
      } catch (err) {
        assert(err==="error");
      }
    });
  });
});