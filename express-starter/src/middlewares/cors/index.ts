import cors, { CorsOptions } from "cors";
import { environment } from "@lib/environment";
import { MiddlewareFunction } from "@utils/types";
import { DEPLOYMENT_ENVIRONMENT } from "@utils/enums";

const corsOptions: CorsOptions = {
  origin: (requestOrigin, callback) => {
    if (
      requestOrigin &&
      environment.allowedCorsDomains?.indexOf(requestOrigin) !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

/**
 *
 * @returns {CustomFunction}
 */
export const handleCors = (): MiddlewareFunction<unknown> => {
  if (environment.deploymentEnvironment === DEPLOYMENT_ENVIRONMENT.DEVELOPMENT) {
    return cors();
  }
  return cors(corsOptions);
};
