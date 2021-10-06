import { ICreateSpecificationDto } from "../dtos/iCreateSpecificationDto";
import { SpecificationEntity } from "../infra/typeorm/entities/specificationEntity";

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDto): Promise<SpecificationEntity>;
  findByName(name: string): Promise<SpecificationEntity>;
}

export { ISpecificationRepository };

/** Princípio da substituição de Liskov
 * Este arquivo vai servir como um contrato
 * Ele define as funções permitida com os valores a receber e retornar
 */
