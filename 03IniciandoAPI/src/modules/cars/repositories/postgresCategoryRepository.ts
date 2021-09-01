import { CategoryModel } from "../model/categoryModel";
import { ICategoryRepository, ICreateRepositoryDTO } from "./iCategoryRepository";

class PostgresCategoryRepository implements ICategoryRepository {
  create({ name, description }: ICreateRepositoryDTO): CategoryModel {
    console.log(name, description);
    return null;
  }

  list(): CategoryModel[] {
    return null;
  }

  findByName(name: string): CategoryModel {
    console.log(name);
    return null;
  }
}

export { PostgresCategoryRepository };

/** Princípio da substituição de liskov
 * Este arquivo define qual banco de dados vamos utilizar
 * Ele é vinculado com o contrato
 */
