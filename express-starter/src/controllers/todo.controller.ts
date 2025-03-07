import { Todo } from "@modules/entities";
import { todoService } from "@modules/todo/todo.service";
import { MiddlewareFunction } from "@utils/types";

class TodoController{

  getAllTodo:MiddlewareFunction<Promise<Todo[]>> = async(_req,_res,_next)=>{
    return todoService.getAllTodo();
  };

  createTodo:MiddlewareFunction<Promise<number|undefined>> = async (req,_res,_next)=>{
    const { title,description,dueDate } = req.body as unknown as any;
    return todoService.createTodo(title,description,dueDate );
  };

  filterByStatus:MiddlewareFunction<Promise<Todo[]>> = async (req,_res,_next)=>{
    return todoService.filterByStatus(req.query.status === "complete");
  };

  updateTodo:MiddlewareFunction<Promise<number|undefined>> = async(req,_res,_next)=>{
    return todoService.updateTodoItem(req.body as unknown as Partial<Todo>);
  };

  deleteTodo:MiddlewareFunction<Promise<number|undefined>> = async (req,_res,_next)=>{
    return todoService.deleteTodo(req.params.todoId as unknown as number);
  };

  getTodo:MiddlewareFunction<Promise<Todo|null>> = async(req,_res,_next)=>{
    return todoService.getTodo(req.params.todoId as unknown as number);
  };

  markTodoComplete:MiddlewareFunction<Promise<number|undefined>> = async(req,_res,_next)=>{
    return todoService.markTodoComplete(req.params.todoId as unknown as number);
  };

  markTodoInComplete:MiddlewareFunction<Promise<number|undefined>> = async(req,_res,_next)=>{
    return todoService.markTodoInComplete(req.params.todoId as unknown as number);
  };

}

export const todoController = new TodoController();