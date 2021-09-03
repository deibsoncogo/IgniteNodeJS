import { Request, Response } from "express"; // importando os arquivos necessário
import { ListCategoryService } from "./listCategoryService";

class ListCategoryController {
  // instancia para poder utilizar todos recursos
  constructor(private listCategoryService: ListCategoryService) {}

  execute(request: Request, response: Response): Response { // função única
    const all = this.listCategoryService.execute(); // chama a função

    return response.status(200).json(all); // retornar algo ao chamador
  }
}

export { ListCategoryController }; // exporta para ser utilizado em outro local
