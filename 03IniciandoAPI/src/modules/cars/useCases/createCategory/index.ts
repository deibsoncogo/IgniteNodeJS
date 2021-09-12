import { CategoryRepository } from "../../repositories/implementations/categoryRepository";
import { CreateCategoryController } from "./createCategoryController";
import { CreateCategoryService } from "./createCategoryService";

// cria uma função para os códigos serem executados somente quando chamado
export default (): CreateCategoryController => {
  const categoryRepository = new CategoryRepository();
  const createCategoryService = new CreateCategoryService(categoryRepository);
  const createCategoryController = new CreateCategoryController(createCategoryService);

  return createCategoryController;
};

// cria todos instanciamentos necessários e exporta eles
