import { pgDataSource } from "../../loaders/database/datasource";
import { Category, Todo } from "@modules/entities";
import { NotFoundError } from "@lib/error";


const todoRepository = pgDataSource.getRepository(Todo);
const catRepository = pgDataSource.getRepository(Category);


class TodoService{

  createTodo = async (title:string,description:string,dueDate:Date): Promise<number|undefined>=>{
    const todo = await todoRepository.save(todoRepository.create({ title,description,due_date:dueDate }));
    return todo.id;
  };

  addCategory = async (catId:number,todoId:number): Promise<number>=>{
    const [cat,todo] = await Promise.all([catRepository.findOneBy({id:catId}),todoRepository.findOneBy({id:todoId})]);
    if(!cat || !todo){
      throw new NotFoundError("category or todo not found");
    }
    if(!cat.todos || cat.todos.length == 0){
      cat.todos = [];
    }
    await catRepository.save({
      ...cat,
      todos:[...cat.todos,todo]
    });
    return todoId;
  };

  getAllTodo = async():Promise<Todo[]>=>{
    return todoRepository.find({
      relations:{category:true}
    });
  };

  getTodo = async(todoId:number):Promise<Todo|null>=>{
    return todoRepository.findOneBy({
      id: todoId,
      category: true
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

  searchByCategory = async(categoryId:number):Promise<Todo[]>=>{
    return todoRepository.find({
      relations:{category:true},
      where:{
        category: {
          id : categoryId,
        },
      }
    },
    );
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
      },
      relations:{category:true}
    });
  };
}

export const todoService = new TodoService();