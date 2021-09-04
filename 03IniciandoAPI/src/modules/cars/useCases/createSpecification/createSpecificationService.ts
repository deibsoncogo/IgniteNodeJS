import { SpecificationModel } from "../../model/specification"; // importação do model de categoria
import { ISpecificationRepository } from "../../repositories/iSpecificationRepository"; // importação do repositório de categoria

interface IRequest { // tipagem dos itens a receber pelo request
  name: string;
  description: string;
}

class CreateSpecificationService { // grupo único e principal
  constructor(private specificationRepository: ISpecificationRepository) {} // criar o acesso ao repositório

  execute({ name, description }: IRequest): SpecificationModel { // função única e principal
    const specificationAlreadyExists = this.specificationRepository.findByName(name); // chama a função

    if (specificationAlreadyExists) { // evita a duplicação do nome de categoria
      throw new Error("Já existe uma especificação com este nome"); // chama a função de erro
    }

    const specification = this.specificationRepository.create({ name, description }); // chama a função

    return specification; // retorna algo ao chamador
  }
}

export { CreateSpecificationService }; // exporta tudo para ser utilizado em outro arquivo
