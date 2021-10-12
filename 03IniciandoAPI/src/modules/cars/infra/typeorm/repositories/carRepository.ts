import { getRepository, Repository } from "typeorm"; // dependencia para lidar com o banco de dados
import { CarEntity } from "../entities/carEntity";
import { ICreateCarDto } from "@modules/cars/dtos/iCreateCarDto";
import { IListCarAvailableTrueFilterDto } from "@modules/cars/dtos/iListCarAvailableTrueFilterDto";
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

  // função que vai listar os carros disponivel com filtragem extra opcional
  async findAvailableTrueFilter(
    { name, brand, categoryId }: IListCarAvailableTrueFilterDto,
  ): Promise<CarEntity[]> {
    const carQueryBuilder = await this.carRepository
      .createQueryBuilder("car") // cria uma nova tabelas com as informações
      .where("available = :available", { available: true }); // exclui as informações que não atente o requisito

    if (name) { // vai executar o comando abaixo somente se existir alguma informação nesta variável
      carQueryBuilder.andWhere("car.name = :name", { name }); // vai adicionar este requisito ao where anterior e os dados que não bate serão removidos
    }

    if (brand) { // vai executar o comando abaixo somente se existir alguma informação nesta variável
      carQueryBuilder.andWhere("car.brand = :brand", { brand }); // vai adicionar este requisito ao where anterior e os dados que não bate serão removidos
    }

    if (categoryId) { // vai executar o comando abaixo somente se existir alguma informação nesta variável
      carQueryBuilder.andWhere("car.categoryId = :categoryId", { categoryId }); // vai adicionar este requisito ao where anterior e os dados que não bate serão removidos
    }

    // finaliza o tabela retornando oque ficou salvo dentro dela
    const carGetMany = await carQueryBuilder.getMany();

    return carGetMany; // retorna algo ao chamador
  }
}

export { CarRepository }; // exporta para poder ser chamado
