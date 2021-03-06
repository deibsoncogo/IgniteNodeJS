import { ICreateCategoryDto } from "../dtos/iCreateCategoryDto"; // importa a tipagem
import { CategoryEntity } from "../infra/typeorm/entities/categoryEntity"; // importa a entidade

interface ICategoryRepository { // vai servir como um contrato mostrando as funções permitida
  create({ name, description }: ICreateCategoryDto): Promise<CategoryEntity>;
  list(): Promise<CategoryEntity[]>; // define o nome da função e que não recebe nenhum dados e retornar CategoryEntity[]
  findByName(name: string): Promise<CategoryEntity>;
}

export { ICategoryRepository }; // exporta para poder ser chamado

/** Princípio da substituição de Liskov
 * Este arquivo vai servir como um contrato
 * Ele define as funções permitida com os valores a receber e retornar
 */
