import { CustomFunction } from "@utils/types";

/**
 * Returns array of resolved/rejected promise
 *
 * @param {CustomFunction} bootstrapFns
 * @returns {Promise<unknown>}
 */
export const bootstrap =(
  bootstrapFns: CustomFunction<Promise<unknown>>[]
): Promise<void> => {
  // const promiseList = bootstrapFns.map(
  //   (fns: CustomFunction<Promise<unknown>>) => fns()
  // );

  return new Promise(async(resolve,reject)=>{
    for (const fns of bootstrapFns) {
      try{
          await fns()
      }catch (err){
        return reject(err);
      }
    }

  })

  // return Promise.all(promiseList);
};
