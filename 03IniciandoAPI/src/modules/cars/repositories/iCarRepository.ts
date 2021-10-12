import { ICreateCarDto } from "../dtos/iCreateCarDto";
import { IListCarDto } from "../dtos/iListCarDto";
import { CarEntity } from "../infra/typeorm/entities/carEntity";

interface ICarRepository {
  create(
    { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId }: ICreateCarDto
  ): Promise<CarEntity>;
  findByLicensePlate(licensePlate: string): Promise<CarEntity>;
  findAvailableTrueFilter({ name, brand, categoryId }: IListCarDto): Promise<CarEntity[]>;
}

export { ICarRepository }; // exporta para poder ser chamado

/** Princípio da substituição de Liskov
 * Este arquivo vai servir como um contrato
 * Onde precisamos define o nome da função
 * Oque ela deve receber e oque ela vai retornar
 */
