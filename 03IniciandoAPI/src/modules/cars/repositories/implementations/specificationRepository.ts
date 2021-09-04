import { SpecificationModel } from "../../model/specification";
import { ISpecificationRepository, ISpecificationRepositoryDTO } from "../iSpecificationRepository";

class SpecificationRepository implements ISpecificationRepository { // implementes vincula a tipagem
  // devemos trocar const por private para somente este arquivo ter acesso
  private specifications: SpecificationModel[]; // banco de dados volátil com tipagem

  constructor() { // para criar algo
    this.specifications = []; // cria o banco de dados
  }

  create({ name, description }: ISpecificationRepositoryDTO): SpecificationModel {
    // instancia para conseguimos utilizar o constructor dentro do arquivo chamado
    const specification = new SpecificationModel();

    // Object server para vincular dados a um objeto com facilidade
    Object.assign(specification, { // prepara os dados antes de salvar
      name,
      description,
      createdAt: new Date(),
    });

    this.specifications.push(specification); // salva os dados dentro do banco de dados

    return specification; // retorna ao chamador
  }

  findByName(name: string): SpecificationModel { // função que vai buscar uma categoria com este nome
    const specification = this.specifications.find((f) => f.name === name); // realiza a busca

    return specification; // retorna algo ao chamador
  }
}

export { SpecificationRepository };
