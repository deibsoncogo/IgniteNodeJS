import { Router } from "express"; // importa a dependência sobre rota
import { CreateSpecificationController } from "@cars/useCases/createSpecification/createSpecificationController";
import { EnsureAuthenticatedMiddleware } from "@middlewares/ensureAuthenticatedMiddleware";

const specificationRoute = Router(); // método que ajuda na programação

// realiza o instanciamento para assim executar o arquivo corretamente
const createSpecificationController = new CreateSpecificationController();

specificationRoute.use(EnsureAuthenticatedMiddleware); // vai verificar se o usuário está logado

specificationRoute.post("/", createSpecificationController.execute); // cria uma especificação

export { specificationRoute }; // exporta para poder ser chamado
