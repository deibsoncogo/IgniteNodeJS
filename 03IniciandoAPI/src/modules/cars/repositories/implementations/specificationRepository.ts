import { getRepository, Repository } from "typeorm";
import { SpecificationEntity } from "../../entities/specificationEntity";
import { ISpecificationRepository, ISpecificationRepositoryDTO } from "../iSpecificationRepository";

class SpecificationRepository implements ISpecificationRepository { // implementes vincula a tipagem
  // devemos trocar const por private para somente este arquivo ter acesso
  private specificationRepository: Repository<SpecificationEntity>;

  constructor() { // serve para criar algo a partir do instanciamento com o comando new
    this.specificationRepository = getRepository(SpecificationEntity); // cria o acesso ao banco de dados com tipagem
  }

  async create({ name, description }: ISpecificationRepositoryDTO): Promise<SpecificationEntity> {
    // prepara os dados antes de salvar
    const specification = this.specificationRepository.create({ name, description });

    await this.specificationRepository.save(specification); // salva os dados dentro do banco de dados

    return specification; // retorna ao chamador
  }

  async findByName(name: string): Promise<SpecificationEntity> { // função que vai buscar uma categoria com este nome
    const specification = await this.specificationRepository.findOne({ name }); // realiza a busca

    return specification; // retorna algo ao chamador
  }
}

export { SpecificationRepository };
