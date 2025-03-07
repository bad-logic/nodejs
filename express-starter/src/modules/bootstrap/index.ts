import { CustomFunction } from "@utils/types";

/**
 * Returns array of resolved/rejected promise
 *
 * @param {CustomFunction} bootstrapFns
 * @returns {Promise<unknown>}
 */
export const bootstrap = (
    bootstrapFns: CustomFunction<Promise<unknown>>[]
): Promise<unknown[]> => {
  const promiseList = bootstrapFns.map(
      (fns: CustomFunction<Promise<unknown>>) => fns()
  );
  return Promise.all(promiseList);
};