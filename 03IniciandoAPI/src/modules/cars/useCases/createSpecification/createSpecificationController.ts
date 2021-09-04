import { Request, Response } from "express"; // importando os arquivos necessário
import { CreateSpecificationService } from "./createSpecificationService";

class CreateSpecificationController {
  // instancia para poder utilizar todos recursos
  constructor(private createSpecificationService: CreateSpecificationService) {}

  execute(request: Request, response: Response) { // função única
    const { name, description } = request.body; // recebe os dados dentro da requisição

    const specification = this.createSpecificationService.execute({ name, description }); // chama a função

    return response.status(201).json(specification); // retornar algo ao chamador
  }
}

export { CreateSpecificationController }; // exporta para poder ser chamado
