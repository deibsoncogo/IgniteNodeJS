import { Request, Response } from "express"; // importando os arquivos necessário
import { container } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { CreateSpecificationService } from "./createSpecificationService";

class CreateSpecificationController {
  execute(request: Request, response: Response) { // função única
    const { name, description } = request.body; // recebe os dados dentro da requisição

    // vai criar o instanciamento automatico pelo TSyringe para poder utilizar os recursos
    const createSpecificationService = container.resolve(CreateSpecificationService);

    const specification = createSpecificationService.execute({ name, description }); // chama a função

    return response.status(201).json(specification); // retornar algo ao chamador
  }
}

export { CreateSpecificationController }; // exporta para poder ser chamado
