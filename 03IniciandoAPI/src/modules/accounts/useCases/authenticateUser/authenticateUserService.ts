import { compare } from "bcryptjs"; // dependência sobre criptografia
import { sign } from "jsonwebtoken"; // dependência sobre json token
import { inject, injectable } from "tsyringe"; // dependência sobre injeção de repositório
import { IAuthenticateUserDto } from "../../dtos/iAuthenticateUserDto";
import { IUserRepository } from "../../repositories/iUserRepository";
import { AppError } from "@errors/appError";

interface IResponse { // tipagem dos dados para o retorno
  userReturn: { name: string, email: string },
  token: string;
}

@injectable() // para permite a injeção do TSyringe nesta classe
class AuthenticateUserService { // classe única
  constructor( // serve para criar algo quando for chamado pelo comando new
    @inject("UserRepository") // realiza a injeção do TSyringe
    private userRepository: IUserRepository, // criar o acesso ao repositório
  ) {}

  async execute({ email, password }:IAuthenticateUserDto): Promise<IResponse> { // função principal
    const user = await this.userRepository.findByEmail(email); // chama a função

    if (!user) { // vai barra se o email passado não existir no banco de dados
      throw new AppError("Email inválido");
    }

    // vai comparar a senha passada com a senha cadastrada
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) { // se as senhas forem diferente vai barrar
      throw new AppError("Senha inválida");
    }

    const token = sign( // cria o token
      {}, // payload do token (Informações não critica)
      "c8011c6fb0020c80a2bedfbcd3074dc4", // palavra chave do token
      { // configurações do token
        subject: user.id, // devemos passar algo único como o ID do usuário
        expiresIn: "10d", // define o tempo de validade do token
      },
    );

    // separa as informações não critica do usuário para retornar ao chamador
    const userReturn = { name: user.name, email: user.email };

    return { userReturn, token }; // retorna algo ao chamador
  }
}

export { AuthenticateUserService }; // exporta para poder ser chamado
