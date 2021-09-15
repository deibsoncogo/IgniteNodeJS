import { ICreateUserDTO } from "../dtos/ICreateUserDto"; // importando a tipagem
import { UserEntity } from "../entities/userEntity"; // importando a entidade

interface IUserRepository { // vai servir como um contrato mostrando as funções permitida
  create({ name, email, password, driverLicense }: ICreateUserDTO): Promise<UserEntity>;
}

export { IUserRepository }; // exportar para poder ser chamado

/** Princípio da substituição de Liskov
 * Este arquivo vai servir como um contrato
 * Ele define as funções permitida com os valores a receber e retornar
 */
