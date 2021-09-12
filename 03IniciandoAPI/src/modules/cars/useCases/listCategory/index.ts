// import { CategoryRepository } from "../../repositories/implementations/categoryRepository";
import { ListCategoryController } from "./listCategoryController";
import { ListCategoryService } from "./listCategoryService";

const categoryRepository = null;
const listCategoryService = new ListCategoryService(categoryRepository);
const listCategoryController = new ListCategoryController(listCategoryService);

export { listCategoryController };

// cria todos instanciamentos necessários e exporta eles
