import { Router } from "express"; // importação que vai lidar com as rotas
import { CreateSpecificationController } from "@cars/useCases/createSpecification/createSpecificationController";
import { EnsureAuthenticatedMiddleware } from "@middlewares/ensureAuthenticatedMiddleware";
import { EnsureUserAdminMiddleware } from "@middlewares/ensureUserAdminMiddleware";

const specificationRoute = Router(); // método que ajuda na programação

// realiza o instanciamento para assim executar o arquivo corretamente
const createSpecificationController = new CreateSpecificationController();

specificationRoute.use(EnsureAuthenticatedMiddleware, EnsureUserAdminMiddleware); // aplicação de alguns middleware
specificationRoute.post("/", createSpecificationController.execute); // cria uma especificação

export { specificationRoute }; // exporta para poder ser chamado
