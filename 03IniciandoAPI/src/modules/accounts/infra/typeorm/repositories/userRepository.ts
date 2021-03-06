import { getRepository, Repository } from "typeorm";
import { ICreateUserDto } from "@accounts/dtos/iCreateUserDto";
import { UserEntity } from "@accounts/infra/typeorm/entities/userEntity";
import { IUserRepository } from "@accounts/repositories/iUserRepository";

class UserRepository implements IUserRepository { // implementes vincula a tipagem
  // devemos trocar const por private para somente este arquivo ter acesso
  private userRepository: Repository<UserEntity> // variável que vai se tornar o acesso ao banco de dados

  constructor() { // serve para criar algo a partir do instanciamento com o comando new
    this.userRepository = getRepository(UserEntity); // cria o acesso ao banco de dados com tipagem
  }

  async create(
    { name, email, password, driverLicense, avatar, id }: ICreateUserDto,
  ): Promise<UserEntity> { // função que vai criar um usuário
    // prepara os dados antes de salvar
    const user = this.userRepository.create({ name, email, password, driverLicense, avatar, id });

    await this.userRepository.save(user); // salva os dados dentro do banco de dados

    return user; // retorna algo ao chamador
  }

  async findByEmail(email: string): Promise<UserEntity> { // função que busca um usuario pelo email
    const user = await this.userRepository.findOne({ email }); // busca o usuario

    return user; // retorna algo ao chamador
  }

  async findById(id: string): Promise<UserEntity> { // função que busca um usuario pelo id
    const user = await this.userRepository.findOne({ id }); // busca o usuario

    return user; // retorna algo ao chamador
  }
}

export { UserRepository }; // exporta para poder ser chamado
