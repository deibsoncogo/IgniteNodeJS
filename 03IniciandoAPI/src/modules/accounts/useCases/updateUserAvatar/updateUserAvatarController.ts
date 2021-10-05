import { Request, Response } from "express"; // importando os arquivos necessário
import { container } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { UpdateUserAvatarService } from "./updateUserAvatarService";

class UpdateUserAvatarController { // classe única
  async execute(request: Request, response: Response): Promise<Response> { // função única
    const { userId } = request; // recebe os dados dentro do request
    const avatarFile = request.file.filename; // recebe o dado dentro do request

    // vai criar o instanciamento automatico pelo TSyringe para poder utilizar corretamente o arquivo
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const userAvatar = await updateUserAvatarService.execute({ userId, avatarFile }); // chama a função

    return response.status(201).json(userAvatar); // retorna algo ao chamador
  }
}

export { UpdateUserAvatarController }; // exporta para poder ser chamado
