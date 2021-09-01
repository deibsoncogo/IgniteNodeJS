import { CategoryModel } from "../model/categoryModel";
import { ICategoryRepository, ICreateRepositoryDTO } from "./iCategoryRepository";

class CategoryRepository implements ICategoryRepository { // implementes vincula a tipagem
  // devemos trocar const por private para somente este arquivo ter acesso
  private categories: CategoryModel[]; // banco de dados volátil com tipagem

  constructor() { // para criar algo
    this.categories = []; // cria o banco de dados
  }

  create({ name, description }: ICreateRepositoryDTO): CategoryModel { // função que vai criar uma categoria
    // instancia para conseguimos utilizar o constructor dentro do arquivo chamado
    const category = new CategoryModel();

    // Object server para vincular dados a um objeto com facilidade
    Object.assign(category, { // prepara os dados antes de salvar
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category); // salva os dados dentro do banco de dados

    return category; // retorna ao chamador
  }

  list(): CategoryModel[] { // função que vai listar todas categorias cadastrada
    return this.categories; // retorna algo ao chamador
  }

  findByName(name: string): CategoryModel { // função que vai buscar uma categoria com este nome
    const category = this.categories.find((f) => f.name === name); // realiza a busca

    return category; // retorna algo ao chamador
  }
}

export { CategoryRepository }; // exporta para poder ser utilizado por outro arquivo
