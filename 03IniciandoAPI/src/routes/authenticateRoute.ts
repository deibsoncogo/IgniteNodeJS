import { Router } from "express"; // importa a dependência sobre rota
import { AuthenticateUserController } from "@accounts/useCases/authenticateUser/authenticateUserController";

const authenticateRoute = Router(); // método que ajuda na programação

// realiza o instanciamento para assim executar o arquivo corretamente
const authenticateUserController = new AuthenticateUserController();

authenticateRoute.post("/session", authenticateUserController.execute); // cria uma seção

export { authenticateRoute }; // exporta para poder ser chamado
