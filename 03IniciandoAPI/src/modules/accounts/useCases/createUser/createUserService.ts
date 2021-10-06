import { hash } from "bcryptjs"; // dependência que realizar criptografia dos dados
import { inject, injectable } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { ICreateUserDto } from "../../dtos/iCreateUserDto"; // importação da tipagem
import { UserEntity } from "../../infra/typeorm/entities/userEntity"; // importação da entidade
import { IUserRepository } from "../../repositories/iUserRepository"; // importação do contrato do repositório
import { AppError } from "@errors/appError";

@injectable() // para permite a injeção do TSyringe nesta classe
class CreateUserService { // grupo único e principal
  constructor( // serve para criar algo quando for chamado pelo comando new
    @inject("UserRepository") // realiza a injeção do TSyringe
    private userRepository: IUserRepository, // criar o acesso ao repositório
  ) {}

  async execute(
    { name, email, password, driverLicense }: ICreateUserDto,
  ): Promise<UserEntity> { // função única e principal
    const userAlreadyExists = await this.userRepository.findByEmail(email); // chama a função

    if (userAlreadyExists) { // identifica se já existe este email cadastrado
      throw new AppError("Já existe um usuário com este email");
    }

    const passwordHash = await hash(password, 8); // cria a criptografia da senha

    const user = await this.userRepository.create({ // chama a função
      name,
      email,
      password: passwordHash,
      driverLicense,
    });

    return user; // retorna algo ao chamador
  }
}

export { CreateUserService }; // exporta para poder ser chamado
