import { Request, Response } from "express"; // importando os arquivos necessário
import { container } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { CreateCarService } from "./createCarService";

class CreateCarController { // classe que será o controlador
  async execute(request: Request, response: Response): Promise<Response> { // função única e principal
    const { name, description, dailyRate, licensePlate, fineAmount, brand, categoryId } = request.body; // recebe os dados

    // vai criar o instanciamento automatico pelo TSyringe para poder utilizar corretamente o arquivo
    const createCarService = container.resolve(CreateCarService);

    const car = await createCarService.execute({ // chama o serviço de criação de carro
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return response.status(201).json(car); // retorna algo ao chamador
  }
}

export { CreateCarController }; // exporta para poder ser chamado
