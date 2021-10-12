import { inject, injectable } from "tsyringe";
import { IListCarAvailableTrueFilterDto } from "@modules/cars/dtos/iListCarAvailableTrueFilterDto";
import { CarEntity } from "@modules/cars/infra/typeorm/entities/carEntity";
import { ICarRepository } from "@modules/cars/repositories/iCarRepository";

// classe que vai ser o serviço de listagem de carros disponiveis com filtragem extra opcional
@injectable() // para permite a injeção do TSyringe nesta classe
class ListCarAvailableTrueFilterService {
  constructor(
    @inject("CarRepository") // realiza a injeção do TSyringe
    private carRepository: ICarRepository,
  ) {} // cria o acesso ao repositório de carro

  async execute({ name, brand, categoryId }: IListCarAvailableTrueFilterDto): Promise<CarEntity[]> { // método principal
    // chama a função do repositório de carro que vai realizar a busca do carro
    const carValid = this.carRepository.findAvailableTrueFilter({ name, brand, categoryId });

    return carValid; // retorna algo ao chamador
  }
}

export { ListCarAvailableTrueFilterService }; // exporta para poder ser chamado
