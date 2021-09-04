import { Router } from "express"; // importa a dependência sobre rota
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationRoute = Router(); // método que ajuda na programação

specificationRoute.post("/", (request, response) => { // cria uma especificação
  return createSpecificationController.execute(request, response);
});

export { specificationRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
