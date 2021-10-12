import { Request, Response } from "express"; // importações para lidar com rotas
import { container } from "tsyringe"; // dependencia que vai lidar a injeção dos arquivos
import { ListCarService } from "./listCarService";

// classe que vai servir como o controlador da listagem de carros disponiveis com filtra extra opcional
class ListCarController {
  async execute(request: Request, response: Response): Promise<Response> { // cria a função principal
    const { name, brand, categoryId } = request.query; // recebe os dados

    // cria os instanciamentos automaticos
    const listCarService = container.resolve(ListCarService);

    const carAll = await listCarService.execute({ // chama a função do serviço
      name: name as string,
      brand: brand as string,
      categoryId: categoryId as string,
    });

    return response.status(200).json(carAll); // retornar algo ao chamador
  }
}

export { ListCarController }; // exporta para poder ser chamado
