import { CategoryEntity } from "../model/categoryEntity";

interface ICreateRepositoryDTO { // tipagem a parte para não vincular a rota com o BD
  name: string;
  description: string;
}

interface ICategoryRepository { // a interface vai ser o contrato
  create({ name, description }: ICreateRepositoryDTO): Promise<CategoryEntity>;
  list(): Promise<CategoryEntity[]>; // define o nome da função e que não recebe nenhum dados e retornar CategoryEntity[]
  findByName(name: string): Promise<CategoryEntity>;
}

export { ICategoryRepository, ICreateRepositoryDTO }; // exporta para ser chamado quando for necessário

/** Princípio da substituição de Liskov
 * Este arquivo vai servir como um contrato
 * Ele define as funções permitida com os valores a receber e retornar
 */
