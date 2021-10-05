import "reflect-metadata"; // importa a dependencia necessária para o tsyringe funcionar
import { AppError } from "../../../../src/errors/appError"; // importa o arquivo gerenciador de erros
import { ICreateUserDto } from "../../../../src/modules/accounts/dtos/iCreateUserDto"; // importa a tipagem de criação do usuário DTO
import { AuthenticateUserService } from "../../../../src/modules/accounts/useCases/authenticateUser/authenticateUserService"; // importa o serviço de autenticação
import { CreateUserService } from "../../../../src/modules/accounts/useCases/createUser/createUserService"; // importa o serviço do usuário
import { UserRepositoryInMemory } from "../repositories/userRepositoryInMemory"; // importa o repositório volatil

let authenticateUserService: AuthenticateUserService; // cria a variavel para o serviço
let userRepositoryInMemory: UserRepositoryInMemory; // cria a variavel para o repositório
let createUserService: CreateUserService; // cria a variavel para o serviço

describe("Autenticação do usuário", () => { // cria um grupo para os testes
  beforeEach(() => { // serve para executar um grupo de comando antes de todos os testes
    userRepositoryInMemory = new UserRepositoryInMemory(); // instancia para criar o acesso ao repositório
    authenticateUserService = new AuthenticateUserService(userRepositoryInMemory); // instancia para criar o acesso ao serviço com o repositório vinculado
    createUserService = new CreateUserService(userRepositoryInMemory); // instancia para criar o acesso ao repositório
  });

  it("O usuário deve ser capaz de se autenticar", async () => { // cria um teste
    const { name, email, password, driverLicense }: ICreateUserDto = { // dados do usuário
      name: "User test",
      email: "user@test.com.br",
      password: "123456",
      driverLicense: "000123",
    };

    // chama o servico de criação do usuário
    await createUserService.execute({ name, email, password, driverLicense });

    // chama o servico de criação da autenticação
    const token = await authenticateUserService.execute({ email, password });

    expect(token).toHaveProperty("token"); // verifica se existe o campo token
  });

  it("Não deve ser capaz de autenticar um usuário inexistente", () => { // cria o teste
    expect(async () => { // define oque olhar
      // chama o servico de criação da autenticação
      await authenticateUserService.execute({ email: "user@test.com.br", password: "123456" });
    }).rejects.toBeInstanceOf(AppError); // verifica se lançou um erro do arquivo AppError
  });

  it("Não deve ser capaz de autenticar um usuário com a senha incorreta", () => { // cria o teste
    expect(async () => { // define oque olhar
      const { name, email, password, driverLicense }: ICreateUserDto = { // dados do usuário
        name: "User test",
        email: "user@test.com.br",
        password: "123456",
        driverLicense: "000123",
      };

      // chama o serviço de criação do usuário
      await createUserService.execute({ name, email, password, driverLicense });

      // chama o serviço de criação de autenticação do usuário
      await authenticateUserService.execute({ email, password: "incorrectPassword" });
    }).rejects.toBeInstanceOf(AppError); // verifica se lançou um erro do arquivo AppError
  });
});
