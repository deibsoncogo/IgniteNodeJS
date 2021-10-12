import { ICreateCarDto } from "@modules/cars/dtos/iCreateCarDto";
import { IListCarAvailableTrueFilterDto } from "@modules/cars/dtos/iListCarAvailableTrueFilterDto";
import { CarEntity } from "@modules/cars/infra/typeorm/entities/carEntity";
import { ICarRepository } from "@modules/cars/repositories/iCarRepository";

// classe que vai servir como um repositório volatil de carros
class CarRepositoryImMemory implements ICarRepository {
  cars: CarEntity[] = [] // criando um bando de dados tipado e volatil

  // função que vai criar o cadastro de um novo carro
  async create(
    { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId }: ICreateCarDto,
  ): Promise<CarEntity> {
    const car = new CarEntity(); // cria uma variável instanciada e tipada

    // prepara os dados antes de salvar
    Object.assign(car, { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId });

    this.cars.push(car); // salva os dados

    return car; // retorna algo ao chamador
  }

  // função que vai buscar um carro pela placa
  async findByLicensePlate(licensePlate: string): Promise<CarEntity> {
    const carFind = this.cars.find((car) => car.licensePlate === licensePlate); // chama o método de busca

    return carFind; // retorna algo algo chamador
  }

  // função que vai listar os carros disponivel com filtragem extra opcional
  async findAvailableTrueFilter(
    { name, brand, categoryId }: IListCarAvailableTrueFilterDto,
  ): Promise<CarEntity[]> {
    const carFilterAvailableTrue = this.cars.filter((car) => { // chama o método que vai realizar uma filtra nas informações
      if (car.available === true
        && (name ? car.name === name : true)
        && (brand ? car.brand === brand : true)
        && (categoryId ? car.categoryId === categoryId : true)
      ) { // regras que definem quando retornar as informações do carro
        return car; // retorna as informações do carro
      }
      return null; // retorna nenhuma informação
    });

    return carFilterAvailableTrue; // retorna algo ao chamador
  }
}

export { CarRepositoryImMemory }; // exporta para poder ser utilizado
