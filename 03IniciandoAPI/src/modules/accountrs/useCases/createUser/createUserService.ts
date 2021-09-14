import { inject, injectable } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { ICreateUserDTO } from "../../dtos/ICreateUserDto"; // importação da tipagem
import { UserEntity } from "../../entities/userEntity"; // importação da entidade
import { IUserRepository } from "../../repositories/iUserRepository"; // importação do contrato do repositório

@injectable() // para permite a injeção do TSyringe nesta classe
class CreateUserService { // grupo único e principal
  constructor( // serve para criar algo quando for chamado pelo comando new
    @inject("UserRepository") // realiza a injeção do TSyringe
    private userRepository: IUserRepository, // criar o acesso ao repositório
  ) {}

  async execute(
    { name, userName, password, email, driverLicense }: ICreateUserDTO,
  ): Promise<UserEntity> { // função única e principal
    const user = await this.userRepository.create({ name, userName, password, email, driverLicense }); // chama a função

    return user; // retorna algo ao chamador
  }
}

export { CreateUserService }; // exporta para poder ser chamado
