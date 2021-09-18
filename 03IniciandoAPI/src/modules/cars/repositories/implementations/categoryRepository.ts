import { getRepository, Repository } from "typeorm";
import { ICreateCategoryDTO } from "../../dtos/iCreateRepositoryDto";
import { CategoryEntity } from "../../entities/categoryEntity";
import { ICategoryRepository } from "../iCategoryRepository";

class CategoryRepository implements ICategoryRepository { // implementes vincula a tipagem
  // devemos trocar const por private para somente este arquivo ter acesso
  private categoryRepository: Repository<CategoryEntity>; // variável que vai se tornar o acesso ao banco de dados

  constructor() { // serve para criar algo a partir do instanciamento com o comando new
    this.categoryRepository = getRepository(CategoryEntity); // cria o acesso ao banco de dados com tipagem
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<CategoryEntity> { // função que vai criar uma categoria
    // prepara os dados antes de salvar
    const category = this.categoryRepository.create({ name, description });

    await this.categoryRepository.save(category); // salva os dados dentro do banco de dados

    return category; // retorna algo ao chamador
  }

  async list(): Promise<CategoryEntity[]> { // função que vai listar todas categorias cadastrada
    const categoryAll = await this.categoryRepository.find(); // busca as informações no DB

    return categoryAll; // retorna algo ao chamador
  }

  async findByName(name: string): Promise<CategoryEntity> { // função que vai buscar uma categoria com este nome
    const category = await this.categoryRepository.findOne({ name }); // realiza a busca

    return category; // retorna algo ao chamador
  }
}

export { CategoryRepository }; // exporta para poder ser chamado
