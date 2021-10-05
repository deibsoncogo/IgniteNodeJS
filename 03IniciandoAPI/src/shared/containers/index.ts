import { container } from "tsyringe"; // importando os itens que iremos usar
import { UserRepository } from "@accountrs/repositories/implementations/userRepository";
import { IUserRepository } from "@accountrs/repositories/iUserRepository";
import { ICategoryRepository } from "@cars/repositories/iCategoryRepository";
import { CategoryRepository } from "@cars/repositories/implementations/categoryRepository";
import { SpecificationRepository } from "@cars/repositories/implementations/specificationRepository";
import { ISpecificationRepository } from "@cars/repositories/iSpecificationRepository";

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
