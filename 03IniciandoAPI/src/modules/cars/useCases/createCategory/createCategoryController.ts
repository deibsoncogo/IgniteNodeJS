import { Request, Response } from "express"; // importando os arquivos necessário
import { container } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { CreateCategoryService } from "./createCategoryService";

class CreateCategoryController { // grupo único
  async execute(request: Request, response: Response): Promise<Response> { // função única
    const { name, description } = request.body; // recebe os dados dentro da requisição

    // vai criar o instanciamento automatico pelo TSyringe para poder utilizar corretamente o arquivo
    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({ name, description }); // chama a função

    return response.status(201).json(category); // retornar algo ao chamador
  }
}

export { CreateCategoryController }; // exporta para podere ser chamado
