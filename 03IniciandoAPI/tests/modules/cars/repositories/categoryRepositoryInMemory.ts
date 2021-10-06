import { ICreateCategoryDto } from "@cars/dtos/iCreateCategoryDto";
import { CategoryEntity } from "@cars/infra/typeorm/entities/categoryEntity";
import { ICategoryRepository } from "@cars/repositories/iCategoryRepository";

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
