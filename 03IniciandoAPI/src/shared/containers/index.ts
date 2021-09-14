import { container } from "tsyringe"; // importando os itens que iremos usar
import { UserRepository } from "../../modules/accountrs/repositories/implementations/userRepository";
import { IUserRepository } from "../../modules/accountrs/repositories/iUserRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/iCategoryRepository";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/categoryRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/specificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/iSpecificationRepository";

// cria os instanciamentos automaticamente sobre as categorias
container.registerSingleton<ICategoryRepository>(
  "CategoryRepository", CategoryRepository, // primeiro definimos um nome e depois o repositorio
);

// cria os instanciamentos automaticamente sobre as especificações
container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository", SpecificationRepository,
);

// cria os instanciamentos automaticamente sobre os usuários
container.registerSingleton<IUserRepository>(
  "UserRepository", UserRepository,
);
