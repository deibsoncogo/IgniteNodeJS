import { getRepository, Repository } from "typeorm"; // dependencia para lidar com o banco de dados
import { CarEntity } from "../entities/carEntity";
import { ICreateCarDto } from "@modules/cars/dtos/iCreateCarDto";
import { ICarRepository } from "@modules/cars/repositories/iCarRepository";

class CarRepository implements ICarRepository { // cria a classe que vai ser o repositório
  private carRepository: Repository<CarEntity> // cria a variavel que vai ser utilizada como conexão ao DB

  constructor() { // serve para criar algo quando é chamado pelo comando new
    this.carRepository = getRepository(CarEntity); // cria o vinculo com o banco de dados
  }

  async create( // função que vai criar o cadastro de um carro
    { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId }: ICreateCarDto,
  ): Promise<CarEntity> {
    const car = this.carRepository.create({ // prepara os dados antes de salvar
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    await this.carRepository.save(car); // salva os dados

    return car; // retorna algo ao chamador
  }

  // função que vai buscar pela placa o cadastro de um carro
  async findByLicensePlate(licensePlate: string): Promise<CarEntity> {
    const car = await this.carRepository.findOne({ licensePlate }); // realiza a busca

    return car; // retorna algo ao chamador
  }
}

export { CarRepository }; // exporta para poder ser chamado
