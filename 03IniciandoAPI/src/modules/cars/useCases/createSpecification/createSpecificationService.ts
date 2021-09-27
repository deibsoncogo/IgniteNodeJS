import { inject, injectable } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { AppError } from "../../../../errors/appError";
import { ICreateSpecificationDto } from "../../dtos/iCreateSpecificationDto"; // importação da tipagem
import { SpecificationEntity } from "../../entities/specificationEntity"; // importação da entidade de categoria
import { ISpecificationRepository } from "../../repositories/iSpecificationRepository"; // importação do repositório de categoria

@injectable() // para permite a injeção do TSyringe nesta classe
class CreateSpecificationService { // grupo único e principal
  constructor( // criar o acesso ao repositório
    @inject("SpecificationRepository") // realiza a injeção do TSyringe
    private specificationRepository: ISpecificationRepository, // criar o acesso ao repositório
  ) {}

  async execute({ name, description }: ICreateSpecificationDto): Promise<SpecificationEntity> { // função única e principal
    const specificationAlreadyExists = await this.specificationRepository.findByName(name); // chama a função

    if (specificationAlreadyExists) { // evita a duplicação do nome de categoria
      throw new AppError("Já existe uma especificação com este nome"); // chama a função de erro
    }

    const specification = await this.specificationRepository.create({ name, description }); // chama a função

    return specification; // retorna algo ao chamador
  }
}

export { CreateSpecificationService }; // exporta tudo para ser utilizado em outro arquivo
