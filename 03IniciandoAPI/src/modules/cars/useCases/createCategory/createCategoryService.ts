import { inject, injectable } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { ICreateCategoryDto } from "../../dtos/iCreateCategoryDto"; // importação da tipagem
import { CategoryEntity } from "../../infra/typeorm/entities/categoryEntity"; // importação da entidade de categoria
import { ICategoryRepository } from "../../repositories/iCategoryRepository"; // importação do repositório de categoria
import { AppError } from "@errors/appError";

@injectable() // para permite a injeção do TSyringe nesta classe
class CreateCategoryService { // grupo único e principal
  constructor( // serve para criar algo quando for chamado pelo comando new
    @inject("CategoryRepository") // realiza a injeção do TSyringe
    private categoryRepository: ICategoryRepository, // criar o acesso ao repositório
  ) {}

  async execute({ name, description }: ICreateCategoryDto): Promise<CategoryEntity> { // função única e principal
    const categoryAlreadyExists = await this.categoryRepository.findByName(name); // chama a função

    if (categoryAlreadyExists) { // evita a duplicação do nome de categoria
      throw new AppError("Já existe uma categoria com este nome"); // chama a função de erro
    }

    const category = await this.categoryRepository.create({ name, description }); // chama a função

    return category; // retorna algo ao chamador
  }
}

export { CreateCategoryService }; // exporta tudo para ser utilizado em outro arquivo
