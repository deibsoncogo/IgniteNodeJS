import { ICreateCategoryDto } from "../../../../src/modules/cars/dtos/iCreateCategoryDto"; // importação das tipagens de DTO
import { CategoryEntity } from "../../../../src/modules/cars/entities/categoryEntity"; // importação das entidades
import { ICategoryRepository } from "../../../../src/modules/cars/repositories/iCategoryRepository"; // importação do contrato do repositório

class CategoryRepositoryInMemory implements ICategoryRepository { // classe principal
  categories: CategoryEntity[] = []; // banco de dados volatil

  async create({ name, description }: ICreateCategoryDto): Promise<CategoryEntity> { // cria uma categoria
    const category = new CategoryEntity(); // instancia para criar o banco de dados

    Object.assign(category, { name, description }); // prepara os dados antes de salvar

    this.categories.push(category); // salva os dados

    return category; // retornar algo ao chamador
  }

  async list(): Promise<CategoryEntity[]> { // lista as categorias
    const categoryAll = this.categories; // recebe as categorias salva

    return categoryAll; // retorna algo ao chamador
  }

  async findByName(name: string): Promise<CategoryEntity> { // busca uma categoria pelo nome
    const categoryFind = this.categories.find((category) => category.name === name); // realiza a busca

    return categoryFind; // retorna algo ao chamador
  }
}

export { CategoryRepositoryInMemory }; // exporta para poder ser chamado
