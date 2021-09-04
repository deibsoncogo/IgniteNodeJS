import { Router } from "express"; // importa a dependência sobre rota
import { SpecificationRepository } from "../modules/cars/repositories/implementations/specificationRepository"; // importa o arquivo criado
import { CreateSpecificationsService } from "../modules/cars/services/createSpecificationsService"; // importa o arquivo criado

const specificationRoute = Router(); // método que ajuda na programação
const specificationRepository = new SpecificationRepository(); // instancia para poder utilizar o arquivo

specificationRoute.post("/", (request, response) => { // cria uma especificação
  const { name, description } = request.body; // recebe os dados dentro da requisição

  // instancia para poder utilizar todos recursos criando um vinculo com o repositório
  const createSpecificationService = new CreateSpecificationsService(specificationRepository);

  const category = createSpecificationService.execute({ name, description }); // chama a função

  return response.status(201).json(category); // retornar algo ao chamado
});

export { specificationRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
