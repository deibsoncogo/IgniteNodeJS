import { container } from "tsyringe"; // importando os itens que iremos usar
import { ICategoryRepository } from "../../modules/cars/repositories/iCategoryRepository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/categoryRepository";

// cria os instanciamentos automaticamente sobre as categorias
container.registerSingleton<ICategoryRepository>(
  "CategoryRepository", CategoryRepository, // primeiro definimos um nome e depois o repositorio
);
