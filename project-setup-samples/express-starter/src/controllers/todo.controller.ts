import { Todo } from "@modules/entities";
import { todoService } from "@modules/todo/todo.service";
import { MiddlewareFunction } from "@utils/types";

class TodoController{

  createTodo:MiddlewareFunction<Promise<number|undefined>> = async (req,_res,_next)=>{
    const { title,description,dueDate } = req.body as unknown as any;
    return todoService.createTodo(title,description,dueDate );
  };

  getAllTodo:MiddlewareFunction<Promise<Todo[]>> = async(_req,_res,_next)=>{
    return todoService.getAllTodo();
  };

  getTodo:MiddlewareFunction<Promise<Todo|null>> = async(req,_res,_next)=>{
    return todoService.getTodo(req.params.todoId as unknown as number);
  };

  addCategory:MiddlewareFunction<Promise<number>> = async (req,_res,_next)=>{
    const catId = req.params.catId as unknown as number;
    const todoId = req.params.todoId as unknown as number;
    return todoService.addCategory(catId,todoId);
  };

  markTodoComplete:MiddlewareFunction<Promise<number|undefined>> = async(req,_res,_next)=>{
    return todoService.markTodoComplete(req.params.todoId as unknown as number);
  };

  markTodoInComplete:MiddlewareFunction<Promise<number|undefined>> = async(req,_res,_next)=>{
    return todoService.markTodoInComplete(req.params.todoId as unknown as number);
  };

  searchByCategory:MiddlewareFunction<Promise<Todo[]>> = async(req,_res,_next)=>{
    return todoService.searchByCategory(req.params.catId as unknown as number);
  };

  updateTodo:MiddlewareFunction<Promise<number|undefined>> = async(req,_res,_next)=>{
    return todoService.updateTodoItem(req.body as unknown as Partial<Todo>);
  };

  deleteTodo:MiddlewareFunction<Promise<number|undefined>> = async (req,_res,_next)=>{
    return todoService.deleteTodo(req.params.todoId as unknown as number);
  };

  filterByStatus:MiddlewareFunction<Promise<Todo[]>> = async (req,_res,_next)=>{
    return todoService.filterByStatus(req.query.status === "complete");
  };

}

export const todoController = new TodoController();