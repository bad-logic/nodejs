import { pgDataSource } from "../../loaders/database/datasource";
import { Category } from "@modules/entities";


const categoryRepository = pgDataSource.getRepository(Category);

class CategoryService{

   createCategory = async(name:string): Promise<number|undefined>=>{
    const data = await categoryRepository.save(categoryRepository.create({ name }));
    return data.id;
  };

  getAllCategories = ():Promise<Category[]>=>{
    return categoryRepository.find();
  };

}

export const categoryService = new CategoryService();