import httpContext from "express-http-context";

import environment from "@lib/environment";
import { Logger } from "@modules/logger";
import { meta } from "@utils/meta";

/**
 *
 * @returns {Record<string,unknown>}
 */
const getHttpContext = (): Record<string, unknown> => {
  const requestId = httpContext.get("requestId");
  return { requestId };
};

export const logger = new Logger({
  deploymentEnvironment: environment.deploymentEnvironment,
  defaultMeta: { service: meta.name, logger: "generalLogger" },
  level: "debug",
  metaProvider: getHttpContext,
});
