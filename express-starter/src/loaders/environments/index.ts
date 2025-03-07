import { environment } from "@lib/environment";

/**
 *
 * @returns {Promise<string>}
 */
export const EnvLoader = (): Promise<void> =>
  new Promise((resolve, reject) => {
    console.log({ environment });
    if (environment.hasErrors()) {
      const errorMessage = environment.errors[0];
      console.error("❌ Unable to load environment variables");
      return reject(errorMessage);
    }
    console.info("✅ environment variables loaded");
    return resolve();
  });