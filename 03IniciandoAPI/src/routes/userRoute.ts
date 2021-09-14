import { Router } from "express"; // importa a dependência sobre rota
import { CreateUserController } from "../modules/accountrs/useCases/createUser/createUserController";

const userRoute = Router(); // método que ajuda na programação

// realiza o instanciamento para assim executar o arquivo corretamente
const createUserController = new CreateUserController();

userRoute.post("/", createUserController.execute); // cria um usuário

export { userRoute }; // exporta para poder ser chamado
