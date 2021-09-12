import { Request, Response } from "express"; // importando os arquivos necessário
import { container } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { ListCategoryService } from "./listCategoryService";

class ListCategoryController {
  async execute(request: Request, response: Response): Promise<Response> { // função única
    // vai criar o instanciamento automatico pelo TSyringe para poder utilizar os recursos
    const listCategoryService = container.resolve(ListCategoryService);

    const all = await listCategoryService.execute(); // chama a função

    return response.status(200).json(all); // retornar algo ao chamador
  }
}

export { ListCategoryController }; // exporta para ser utilizado em outro local
