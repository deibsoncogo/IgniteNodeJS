import { Request, Response } from "express"; // importações necessárias
import { container } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { ImportCategoryService } from "./importCategoryService";

class ImportCategoryController {
  async execute(request: Request, response: Response): Promise<Response> { // função única
    console.log("Controlador - Inicio");

    const { file } = request; // recebe o arquivo enviado

    // vai criar o instanciamento automatico pelo TSyringe para poder utilizar os recursos
    const importCategoryService = container.resolve(ImportCategoryService);

    const fileTreated = await importCategoryService.execute(file); // chama o serviço responsável

    console.log("Controlador - Final");

    return response.status(201).json(fileTreated); // retorna algo ao chamador
  }
}

export { ImportCategoryController }; // exporta para poder ser chamado
