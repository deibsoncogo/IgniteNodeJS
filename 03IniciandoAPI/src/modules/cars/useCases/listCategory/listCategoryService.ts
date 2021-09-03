import { CategoryModel } from "../../model/categoryModel"; // importação do model de categoria
import { ICategoryRepository } from "../../repositories/iCategoryRepository"; // importação do repositório de categoria

class ListCategoryService { // grupo único e principal
  constructor(private categoryRepository: ICategoryRepository) {} // criar o acesso ao repositório

  execute(): CategoryModel[] { // função única e principal
    const category = this.categoryRepository.list(); // chama uma função

    return category; // retorna algo ao chamador
  }
}

export { ListCategoryService };
