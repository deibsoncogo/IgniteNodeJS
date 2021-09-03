import { CategoryRepository } from "../../repositories/categoryRepository";
import { CreateCategoryController } from "./createCategoryController";
import { CreateCategoryService } from "./createCategoryService";

const categoryRepository = CategoryRepository.getInstance();
const createCategoryService = new CreateCategoryService(categoryRepository);
const createCategoryController = new CreateCategoryController(createCategoryService);

export { createCategoryController };

// cria todos instanciamentos necessários e exporta eles
