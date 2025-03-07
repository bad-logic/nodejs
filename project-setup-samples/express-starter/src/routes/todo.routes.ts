import { Router } from "express";
import Joi from "joi";
import { asyncWrapper, pathParamsValidator, queryParamsValidator, validator } from "@middlewares";
import { todoController } from "../controllers/todo.controller";

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

const catIdValidatorSchema = Joi.object({
  catId: Joi.number().min(1).required()
});

const filterSchema = Joi.object({
  status: Joi.string().valid("complete", "incomplete").required(),
});

const todoCatIdValidatorSchema = Joi.object({
  todoId: Joi.number().min(1).required(),
  catId: Joi.number().min(1).required()
});

todoRouter.post("/", validator(todoSchema), asyncWrapper(todoController.createTodo));
todoRouter.get("/", asyncWrapper(todoController.getAllTodo));

todoRouter.get("/search/:catId", pathParamsValidator(catIdValidatorSchema), asyncWrapper(todoController.searchByCategory));
todoRouter.get("/filter/", queryParamsValidator(filterSchema), asyncWrapper(todoController.filterByStatus));

todoRouter.get("/:todoId", pathParamsValidator(todoIdValidatorSchema), asyncWrapper(todoController.getTodo));
todoRouter.put("/:todoId", pathParamsValidator(todoIdValidatorSchema),validator(updateTodoSchema), asyncWrapper(todoController.updateTodo));
todoRouter.delete("/:todoId", pathParamsValidator(todoIdValidatorSchema), asyncWrapper(todoController.deleteTodo));

todoRouter.get("/:todoId/complete", pathParamsValidator(todoIdValidatorSchema), asyncWrapper(todoController.markTodoComplete));
todoRouter.get("/:todoId/incomplete", pathParamsValidator(todoIdValidatorSchema), asyncWrapper(todoController.markTodoInComplete));
todoRouter.get("/:todoId/:catId", pathParamsValidator(todoCatIdValidatorSchema), asyncWrapper(todoController.addCategory));

