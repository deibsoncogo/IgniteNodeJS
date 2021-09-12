import { getRepository, Repository } from "typeorm";
import { CategoryEntity } from "../../model/categoryEntity";
import { ICategoryRepository, ICreateRepositoryDTO } from "../iCategoryRepository";

class CategoryRepository implements ICategoryRepository { // implementes vincula a tipagem
  // devemos trocar const por private para somente este arquivo ter acesso
  private repositoryCategory: Repository<CategoryEntity>; // variável que vai se tornar o acesso ao banco de dados

  private static INSTANCE: CategoryRepository; // cria uma variável privada estática tipada

  // adicionamos private para bloquear acesso externo
  private constructor() { // serve para criar algo a partir do instanciamento (Comando new)
    this.repositoryCategory = getRepository(CategoryEntity); // cria o acesso ao banco de dados com tipagem
  }

  public static getInstance(): CategoryRepository { // método que vai criar o BD volátil com tipagem
    if (!CategoryRepository.INSTANCE) { // identifica se já foi instanciado
      CategoryRepository.INSTANCE = new CategoryRepository(); // cria o instanciamento
    }

    return CategoryRepository.INSTANCE; // retornar o banco de dados volátil com tipagem
  }

  async create({ name, description }: ICreateRepositoryDTO): Promise<CategoryEntity> { // função que vai criar uma categoria
    // prepara os dados antes de salvar
    const category = this.repositoryCategory.create({ name, description });

    await this.repositoryCategory.save(category); // salva os dados dentro do banco de dados

    return category; // retorna algo ao chamador
  }

  async list(): Promise<CategoryEntity[]> { // função que vai listar todas categorias cadastrada
    const categoryAll = await this.repositoryCategory.find(); // busca as informações no DB

    return categoryAll; // retorna algo ao chamador
  }

  async findByName(name: string): Promise<CategoryEntity> { // função que vai buscar uma categoria com este nome
    const category = await this.repositoryCategory.findOne({ name }); // realiza a busca

    return category; // retorna algo ao chamador
  }
}

export { CategoryRepository }; // exporta para poder ser utilizado por outro arquivo
