import { ICreateUserDto } from "@accounts/dtos/iCreateUserDto";
import { UserEntity } from "@accounts/infra/typeorm/entities/userEntity";
import { IUserRepository } from "@accounts/repositories/iUserRepository";

class UserRepositoryInMemory implements IUserRepository { // classe principal
  users: UserEntity[] = []; // banco de dados volatil

  async create({ name, email, password, driverLicense }: ICreateUserDto): Promise<UserEntity> { // cria um usuário
    const user = new UserEntity(); // instancia para criar o banco de dados

    Object.assign(user, { name, email, password, driverLicense }); // prepara os dados antes de salvar

    this.users.push(user); // salva os dados

    return user; // retornar algo ao chamador
  }

  async findByEmail(email: string): Promise<UserEntity> { // busca um usuário pelo email
    const userFind = this.users.find((user) => user.email === email); // realiza a busca

    return userFind; // retorna algo ao chamador
  }

  async findById(id: string): Promise<UserEntity> { // busca um usuário pelo id
    const userFind = this.users.find((user) => user.id === id); // realiza a busca

    return userFind; // retorna algo ao chamador
  }
}

export { UserRepositoryInMemory }; // exporta para poder ser chamado
