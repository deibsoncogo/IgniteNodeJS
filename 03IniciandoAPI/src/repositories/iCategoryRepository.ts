import { CategoryModel } from "../model/categoryModel";

interface ICreateRepositoryDTO { // tipagem a parte para não vincular a rota com o BD
  name: string;
  description: string;
}

interface ICategoryRepository { // a interface vai ser o contrato
  create({ name, description }: ICreateRepositoryDTO): CategoryModel;
  list(): CategoryModel[]; // define o nome da função e que não recebe nenhum dados e retornar CategoryModel[]
  findByName(name: string): CategoryModel;
}

export { ICategoryRepository, ICreateRepositoryDTO }; // exporta para ser chamado quando for necessário

/** Princípio da substituição de Liskov
 * Este arquivo vai servir como um contrato
 * Ele define as funções permitida com os valores a receber e retornar
 */
