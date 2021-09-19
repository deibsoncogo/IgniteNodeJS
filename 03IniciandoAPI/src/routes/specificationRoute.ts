import { Router } from "express"; // importa a dependência sobre rota
import { EnsureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/createSpecificationController";

const specificationRoute = Router(); // método que ajuda na programação

// realiza o instanciamento para assim executar o arquivo corretamente
const createSpecificationController = new CreateSpecificationController();

specificationRoute.use(EnsureAuthenticatedMiddleware); // vai verificar se o usuário está logado

specificationRoute.post("/", createSpecificationController.execute); // cria uma especificação

export { specificationRoute }; // exporta para poder ser chamado
