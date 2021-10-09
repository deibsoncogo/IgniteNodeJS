import { ICreateCarDto } from "@modules/cars/dtos/iCreateCarDto";
import { CarEntity } from "@modules/cars/infra/typeorm/entities/carEntity";
import { ICarRepository } from "@modules/cars/repositories/iCarRepository";

class CarRepositoryImMemory implements ICarRepository { // criando uma classe
  cars: CarEntity[] = [] // criando um bando de dados tipado e volatil

  async create( // criando uma função
    { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId }: ICreateCarDto,
  ): Promise<CarEntity> {
    const car = new CarEntity(); // cria uma variável instanciada e tipada

    // prepara os dados antes de salvar
    Object.assign(car, { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId });

    this.cars.push(car); // salva os dados

    return car; // retorna algo ao chamador
  }
}

export { CarRepositoryImMemory }; // exporta para poder ser utilizado
