/** Imports */
import { environment } from "@lib/environment";
import {meta} from "@utils/meta";

/**
 * prints some metadata in console
 * @returns {void}
 */
export const InfoLoader = (): void => {
  if (environment.underMaintenance) {
    console.info("starting on maintenance mode. services may be unavailable");
  }
  console.info("");
  console.info("-------------------------------------------------------");
  console.info("");
  console.info(meta.name+'@'+meta.version);
  console.info(
    `${environment.dbDialect} @ ${environment.dbHost}:${environment.dbPort}`
  );
  console.info("");
  console.info("-------------------------------------------------------");
  console.info("");
};
