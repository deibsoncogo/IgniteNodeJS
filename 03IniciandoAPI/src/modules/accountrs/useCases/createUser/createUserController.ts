import { Request, Response } from "express"; // importando os arquivos necessário
import { container } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { CreateUserService } from "./createUserService";

class CreateUserController { // grupo único
  async execute(request: Request, response: Response): Promise<Response> { // função única
    const { name, userName, password, email, driverLicense } = request.body; // recebe os dados dentro da requisição

    // vai criar o instanciamento automatico pelo TSyringe para poder utilizar corretamente o arquivo
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, userName, password, email, driverLicense }); // chama a função

    return response.status(201).json(user); // retornar algo ao chamador
  }
}

export { CreateUserController }; // exporta para poder ser chamado
