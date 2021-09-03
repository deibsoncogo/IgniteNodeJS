import { CategoryRepository } from "../../repositories/categoryRepository";
import { ListCategoryController } from "./listCategoryController";
import { ListCategoryService } from "./listCategoryService";

const categoryRepository = CategoryRepository.getInstance();
const listCategoryService = new ListCategoryService(categoryRepository);
const listCategoryController = new ListCategoryController(listCategoryService);

export { listCategoryController };

// cria todos instanciamentos necessários e exporta eles
