import { Request, Response } from "express"; // importando as funções necessárias
import { container } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { AuthenticateUserService } from "./authenticateUserService";

class AuthenticateUserController { // classe única
  async execute(request: Request, response: Response): Promise<Response> { // função única
    const { email, password } = request.body; //  // recebe os dados dentro da requisição

    // vai criar o instanciamento automatico pelo TSyringe para poder utilizar corretamente o arquivo
    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { userReturn, token } = await authenticateUserService.execute({ email, password }); // chama a função

    return response.json({ userReturn, token }); // retornar algo ao chamador
  }
}

export { AuthenticateUserController }; // exporta para poder ser chamado
