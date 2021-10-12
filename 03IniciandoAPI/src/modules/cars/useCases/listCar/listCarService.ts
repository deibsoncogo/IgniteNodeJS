import { IListCarDto } from "@modules/cars/dtos/iListCarDto";
import { CarEntity } from "@modules/cars/infra/typeorm/entities/carEntity";
import { ICarRepository } from "@modules/cars/repositories/iCarRepository";

// classe que vai ser o serviço de listagem de carros disponiveis com filtragem extra opcional
class ListCarService {
  constructor(private carRepository: ICarRepository) {} // cria o acesso ao repositório de carro

  async execute({ name, brand, categoryId }: IListCarDto): Promise<CarEntity[]> { // método principal
    // chama a função do repositório de carro que vai realizar a busca do carro
    const carAllAvailable = this.carRepository.findAvailableTrueFilter({ name, brand, categoryId });

    return carAllAvailable; // retorna algo ao chamador
  }
}

export { ListCarService }; // exporta para poder ser chamado
