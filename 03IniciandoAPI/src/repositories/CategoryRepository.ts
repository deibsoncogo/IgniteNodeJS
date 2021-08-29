import { CategoryModel } from "../model/categoryModel";

interface ICreateRepositoryDTO { // tipagem a parte para não vincular a rota com o BD
  name: string;
  description: string;
}

class CategoryRepository {
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
}

export { CategoryRepository }; // exporta para poder ser utilizado por outro arquivo
