import { categoryService } from "@modules/category/category.service";
import { MiddlewareFunction } from "@utils/types";
import { Category } from "@modules/entities";

class CategoryController{
  createCategory:MiddlewareFunction<Promise<number|undefined>> = async (req,_res,_next)=>{
    return categoryService.createCategory(req.body.name);
  };

  getAllCategories:MiddlewareFunction<Promise<Category[]>> = async (_req,_res,_next)=>{
    return categoryService.getAllCategories();
  };
}

export const categoryController = new CategoryController();