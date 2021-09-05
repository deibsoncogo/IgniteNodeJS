import { Request, Response } from "express"; // importações necessárias
import { ImportCategoryService } from "./importCategoryService";

class ImportCategoryController {
  // instancia para poder utilizar todos recursos
  constructor(private importCategoryService: ImportCategoryService) {}

  async execute(request: Request, response: Response): Promise<Response> { // função única
    const { file } = request; // recebe o arquivo enviado

    const fileTreated = await this.importCategoryService.execute(file); // chama o serviço responsável

    return response.json(fileTreated); // retorna algo ao chamador
  }
}

export { ImportCategoryController }; // exporta para poder ser chamado
