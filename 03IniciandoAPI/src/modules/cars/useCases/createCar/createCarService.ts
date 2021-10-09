import { inject, injectable } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { ICreateCarDto } from "@modules/cars/dtos/iCreateCarDto";
import { CarEntity } from "@modules/cars/infra/typeorm/entities/carEntity";
import { ICarRepository } from "@modules/cars/repositories/iCarRepository";
import { AppError } from "@shared/infra/http/errors/appError";

@injectable() // para permite a injeção do TSyringe nesta classe
class CreateCarService { // classe única
  constructor( // serve para criar algo quando for chamado pelo comando new
    @inject("CarRepository") // realiza a injeção do TSyringe
    private carRepository: ICarRepository, // cria o acesso ao repositório
  ) {}

  async execute(
    { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId }: ICreateCarDto,
  ): Promise<CarEntity> { // função única e principal
    // busca um carro com esta placa cadastrada
    const carAlreadyExists = await this.carRepository.findByLicensePlate(licensePlate);

    if (carAlreadyExists) { // vai gerar o erro se já existir esta placa cadastrada
      throw new AppError("Já existe um carro cadastrado com esta placa");
    }

    const car = this.carRepository.create({ // chama a função de criação do repositório passando as informações
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return car; // retorna algo ao chamador
  }
}

export { CreateCarService }; // exporta para poder ser chamado
