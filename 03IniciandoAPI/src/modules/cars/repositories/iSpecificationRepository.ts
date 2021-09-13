import { SpecificationEntity } from "../entities/specificationEntity";

interface ISpecificationRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ISpecificationRepositoryDTO): Promise<SpecificationEntity>;
  findByName(name: string): Promise<SpecificationEntity>;
}

export { ISpecificationRepository, ISpecificationRepositoryDTO };

/** Princípio da substituição de Liskov
 * Este arquivo vai servir como um contrato
 * Ele define as funções permitida com os valores a receber e retornar
 */
