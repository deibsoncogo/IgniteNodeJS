import { Request, Response } from "express"; // importando os arquivos necessário
import { CreateCategoryService } from "./createCategoryService";

class CreateCategoryController {
  // instancia para poder utilizar todos recursos
  constructor(private createCategoryService: CreateCategoryService) {}

  execute(request: Request, response: Response): Response { // função única
    const { name, description } = request.body; // recebe os dados dentro da requisição

    const category = this.createCategoryService.execute({ name, description }); // chama a função

    return response.status(201).json(category); // retornar algo ao chamado
  }
}

export { CreateCategoryController }; // exporta para ser chamado em outro lugar
