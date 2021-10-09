import { container } from "tsyringe"; // dependencia que vai realizar os instanciamentos automaticamente
import { UserRepository } from "@accounts/infra/typeorm/repositories/userRepository";
import { IUserRepository } from "@accounts/repositories/iUserRepository";
import { CategoryRepository } from "@cars/infra/typeorm/repositories/categoryRepository";
import { SpecificationRepository } from "@cars/infra/typeorm/repositories/specificationRepository";
import { ICategoryRepository } from "@cars/repositories/iCategoryRepository";
import { ISpecificationRepository } from "@cars/repositories/iSpecificationRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/carRepository";
import { ICarRepository } from "@modules/cars/repositories/iCarRepository";

container.registerSingleton<ICategoryRepository>( // cria os instanciamentos automaticamente
  "CategoryRepository", CategoryRepository, // primeiro definimos um nome e depois o repositorio
);

container.registerSingleton<ISpecificationRepository>( // cria os instanciamentos automaticamente
  "SpecificationRepository", SpecificationRepository, // primeiro definimos um nome e depois o repositorio
);

container.registerSingleton<IUserRepository>( // cria os instanciamentos automaticamente
  "UserRepository", UserRepository, // primeiro definimos um nome e depois o repositorio
);

container.registerSingleton<ICarRepository>( // cria os instanciamentos automaticamente
  "CarRepository", CarRepository, // primeiro definimos um nome e depois o repositorio
);
