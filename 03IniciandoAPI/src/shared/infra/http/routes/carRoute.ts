import { Router } from "express"; // iremos usar o router para lidar com as rotas
import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";

const carRoute = Router(); // método aplicado para agilizar na utilização da função

// realiza o instanciamento para assim executar o arquivo corretamente
const createCarController = new CreateCarController();

carRoute.post("/", createCarController.execute); // cria um carro

export { carRoute }; // exporta para poder ser chamado
