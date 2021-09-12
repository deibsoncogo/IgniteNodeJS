import { inject, injectable } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { CategoryEntity } from "../../model/categoryEntity"; // importação do model de categoria
import { ICategoryRepository } from "../../repositories/iCategoryRepository"; // importação do repositório de categoria

@injectable() // para permite a injeção do TSyringe nesta classe
class ListCategoryService { // grupo único e principal
  constructor( // criar o acesso ao repositório
    @inject("CategoryRepository") // realiza a injeção do TSyringe
    private categoryRepository: ICategoryRepository, // criar o acesso ao repositório
  ) {}

  async execute(): Promise<CategoryEntity[]> { // função única e principal
    const category = await this.categoryRepository.list(); // chama uma função

    return category; // retorna algo ao chamador
  }
}

export { ListCategoryService };
