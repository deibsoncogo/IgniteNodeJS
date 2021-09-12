// import { CategoryRepository } from "../../repositories/implementations/categoryRepository";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryService } from "./importCategoryService";

const categoryRepository = null;
const importCategoryService = new ImportCategoryService(categoryRepository);
const importCategoryController = new ImportCategoryController(importCategoryService);

export { importCategoryController };

// cria todos instanciamentos necessários e exporta eles
