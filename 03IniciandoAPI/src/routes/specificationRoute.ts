import { Router } from "express"; // importa a dependência sobre rota
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/createSpecificationController";

const specificationRoute = Router(); // método que ajuda na programação

// realiza os instanciamento para podemos utilizar os arquivos corretamente
const createSpecificationController = new CreateSpecificationController();

specificationRoute.post("/", createSpecificationController.execute); // cria uma especificação

export { specificationRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
