import { container } from "tsyringe"; // importando os itens que iremos usar
import { UserRepository } from "@accounts/infra/typeorm/repositories/userRepository";
import { IUserRepository } from "@accounts/repositories/iUserRepository";
import { CategoryRepository } from "@cars/infra/typeorm/repositories/categoryRepository";
import { SpecificationRepository } from "@cars/infra/typeorm/repositories/specificationRepository";
import { ICategoryRepository } from "@cars/repositories/iCategoryRepository";
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
