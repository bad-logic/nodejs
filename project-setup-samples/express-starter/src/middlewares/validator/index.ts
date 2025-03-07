import Joi from "joi";
import { MiddlewareFunction } from "@utils/types";
import { ValidationError } from "@lib/error";


const handleValidationError = (error:Joi.ValidationError)=>{
  const errorMessages = error.details.map(detail => {
    return {
      message: detail.message,
      field: detail.path[0] as unknown as string
    };
  });
  throw new ValidationError(errorMessages);
};


/*
 * @params {Joi.ObjectSchema} schema schema to validate
 * @returns {MiddlewareFunction}
 */
export const validator = (schema: Joi.ObjectSchema):MiddlewareFunction<void> =>{
  return async (req,res,next)=>{
    try{
      const { error, value } =  schema.validate(req.body,{ abortEarly: false });
      if(error){
        return handleValidationError(error);
      }
      req.body = value;
      next();
    }catch (err){
      next(err);
    }
  };
};

/*
 * @params {Joi.ObjectSchema} schema schema to validate
 * @returns {MiddlewareFunction}
 */
export const queryParamsValidator = (schema: Joi.ObjectSchema):MiddlewareFunction<void> =>{
  return async (req,res,next)=>{
    try{
      const { error, value } =  schema.validate(req.query,{ abortEarly: false, });
      if(error){
        return handleValidationError(error);
      }
      req.query = value;
      next();
    }catch (err){
      next(err);
    }
  };
};

/*
 * @params {Joi.ObjectSchema} schema schema to validate
 * @returns {MiddlewareFunction}
 */
export const pathParamsValidator = (schema: Joi.ObjectSchema):MiddlewareFunction<void> =>{
  return async (req,res,next)=>{
    try{
      const { error, value } =  schema.validate(req.params,{ abortEarly: false });
      if(error){
        return handleValidationError(error);
      }
      req.params = value;
      next();
    }catch (err){
      next(err);
    }
  };
};