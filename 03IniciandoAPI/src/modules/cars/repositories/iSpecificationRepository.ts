import { SpecificationModel } from "../model/specification";

interface ISpecificationRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ISpecificationRepositoryDTO): SpecificationModel;
  findByName(name: string): SpecificationModel;
}

export { ISpecificationRepository, ISpecificationRepositoryDTO };

/** Princípio da substituição de Liskov
 * Este arquivo vai servir como um contrato
 * Ele define as funções permitida com os valores a receber e retornar
 */
