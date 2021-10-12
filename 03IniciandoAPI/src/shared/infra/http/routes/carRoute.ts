import { Router } from "express"; // iremos usar o router para lidar com as rotas
import { EnsureAuthenticatedMiddleware } from "@middlewares/ensureAuthenticatedMiddleware";
import { EnsureUserAdminMiddleware } from "@middlewares/ensureUserAdminMiddleware";
import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";
import { ListCarController } from "@modules/cars/useCases/listCar/listCarController";

const carRoute = Router(); // método aplicado para agilizar na utilização da função

// realiza o instanciamento para assim executar o arquivo corretamente
const createCarController = new CreateCarController();
const listCarController = new ListCarController();

carRoute.get("/available", listCarController.execute); // listagem dos carros disponivel com filtragem extra opcional

carRoute.use(EnsureAuthenticatedMiddleware, EnsureUserAdminMiddleware); // aplicação de alguns middleware
carRoute.post("/", createCarController.execute); // cria um carro

export { carRoute }; // exporta para poder ser chamado
