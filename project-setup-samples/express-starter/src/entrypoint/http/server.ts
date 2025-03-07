/**----- source map support ---------------------------------------*/
// if you are running a compiled js code then to see the stack trace for errors
// pointing to the source files (ts files) use the below lines in the main entry file
import sourceMapSupport from "source-map-support";
sourceMapSupport.install();
// Error stack traces will now refer to the lines in the source code.
/**-----------------------------------------------------------------*/
import "reflect-metadata";
import express from "express";
import { Settings } from "luxon";
import { bootstrap } from "@modules/bootstrap";
import { CustomFunction } from "@utils/types";
import { EnvLoader, ExpressLoader, InfoLoader, ServerLoader, DatabaseLoader } from "@loaders";

if (require.main === module) {
  Settings.defaultZone = "utc";
  const loaders: CustomFunction<Promise<unknown>>[] = [EnvLoader,DatabaseLoader];
  bootstrap(loaders).then(async () => {
      // express configs
      const app = express();
      ExpressLoader(app);
      await ServerLoader(app);
      // and print out starting log
      InfoLoader();
    }).catch((error: Error) => {
        console.error("❌Error: ",error);
        console.error(`🛑💻Application Crashed  ${error?.stack?.split("\n")}`);
        process.exit(1);
    });
}
