import { Todo } from "@modules/entities";
import { NotFoundError } from "@lib/error";
import  pgDataSource  from "../../loaders/database/datasource";

const todoRepository = pgDataSource.getRepository(Todo);

class TodoService{

  createTodo = async (title:string,description:string,dueDate:Date): Promise<number|undefined>=>{
    const todo = await todoRepository.save(todoRepository.create({ title,description,due_date:dueDate }));
    return todo.id;
  };

  getAllTodo = async():Promise<Todo[]>=>{
    return todoRepository.find();
  };

  getTodo = async(todoId:number):Promise<Todo|null>=>{
    return todoRepository.findOneBy({
      id: todoId
    });
  };

  updateTodoItem = async(item:Partial<Todo>): Promise<number|undefined>=>{
    const todo = await todoRepository.findOneBy({id:item.id});
    if(!todo){
      throw new NotFoundError("todo not found");
    }
    await todoRepository.save({
      ...todo,...item
    });
    return item.id;
  };

  markTodoComplete = async(todoId:number): Promise<number|undefined>=>{
    return this.updateTodoItem({id:todoId,complete:true});
  };

  markTodoInComplete = async(todoId:number):Promise<number|undefined>=>{
    return this.updateTodoItem({id:todoId,complete:false});
  };

  deleteTodo = async (todoId:number):Promise<number|undefined>=>{
    const todo = await todoRepository.findOneBy({id:todoId});
    if(!todo){
      return todoId;
    }
    await todoRepository.delete({id:todoId});
    return todoId;
  };

  filterByStatus = async (complete: boolean ): Promise<Todo[]>=>{
    return todoRepository.find({
      where: {
        complete
      }
    });
  };
}

export const todoService = new TodoService();