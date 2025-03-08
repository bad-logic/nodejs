import { Router } from "express";
import Joi from "joi";

import { pathParamsValidator, queryParamsValidator, validator } from "@middlewares";
import { todoController } from "../controllers/todo.controller";
import { responder } from "../middlewares/responder";

export const todoRouter  = Router();

const todoSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required(),
  description: Joi.string()
    .min(3)
    .max(30)
    .required(),
  dueDate: Joi.date().greater("now").required(),
});

const updateTodoSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .optional(),
  description: Joi.string()
    .min(3)
    .max(30)
    .optional(),
  dueDate: Joi.date().optional(),
});

const todoIdValidatorSchema = Joi.object({
  todoId: Joi.number().min(1).required()
});


const filterSchema = Joi.object({
  status: Joi.string().valid("complete", "incomplete").required(),
});

todoRouter.get("/", responder(todoController.getAllTodo));
todoRouter.post("/", validator(todoSchema), responder(todoController.createTodo));

todoRouter.get("/filter/", queryParamsValidator(filterSchema), responder(todoController.filterByStatus));

todoRouter.get("/:todoId", pathParamsValidator(todoIdValidatorSchema), responder(todoController.getTodo));
todoRouter.put("/:todoId", pathParamsValidator(todoIdValidatorSchema),validator(updateTodoSchema), responder(todoController.updateTodo));
todoRouter.delete("/:todoId", pathParamsValidator(todoIdValidatorSchema), responder(todoController.deleteTodo));

todoRouter.get("/:todoId/complete", pathParamsValidator(todoIdValidatorSchema), responder(todoController.markTodoComplete));
todoRouter.get("/:todoId/incomplete", pathParamsValidator(todoIdValidatorSchema), responder(todoController.markTodoInComplete));

