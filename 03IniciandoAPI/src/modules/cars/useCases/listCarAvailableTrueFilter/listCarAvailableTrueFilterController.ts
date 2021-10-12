import { Request, Response } from "express"; // importações para lidar com rotas
import { container } from "tsyringe"; // dependencia que vai lidar a injeção dos arquivos
import { ListCarAvailableTrueFilterService } from "./listCarAvailableTrueFilterService";

// classe que vai servir como o controlador da listagem de carros disponiveis com filtra extra opcional
class ListCarAvailableTrueFilterController {
  async execute(request: Request, response: Response): Promise<Response> { // cria a função principal
    const { name, brand, categoryId } = request.query; // recebe os dados

    // cria os instanciamentos automaticos
    const listCarService = container.resolve(ListCarAvailableTrueFilterService);

    const carValid = await listCarService.execute({ // chama a função do serviço
      name: name as string,
      brand: brand as string,
      categoryId: categoryId as string,
    });

    return response.status(200).json(carValid); // retornar algo ao chamador
  }
}

export { ListCarAvailableTrueFilterController }; // exporta para poder ser chamado
