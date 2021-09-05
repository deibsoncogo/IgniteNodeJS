import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryService } from "./importCategoryService";

const importCategoryService = new ImportCategoryService();
const importCategoryController = new ImportCategoryController(importCategoryService);

export { importCategoryController };

// cria todos instanciamentos necessários e exporta eles
