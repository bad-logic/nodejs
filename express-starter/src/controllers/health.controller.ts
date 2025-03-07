import { MiddlewareFunction } from "@utils/types";
import { meta } from "@utils/meta";


class HealthController{

  getSystemHealth:MiddlewareFunction<Promise<unknown>> = async (req,_res,_next)=>{
    return{
      ...meta,
      status: "OK",
    }
  };

}

export const healthController = new HealthController();