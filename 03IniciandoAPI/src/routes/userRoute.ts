import { Router } from "express"; // importa a dependência sobre rota
import multer from "multer";
import { CreateUserController } from "../modules/accountrs/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "../modules/accountrs/useCases/updateUserAvatar/updateUserAvatarController";

const userRoute = Router(); // método que ajuda na programação

const upload = multer({ dest: "avatar" }); // cria o upload para a foto do usuário

// realiza o instanciamento para assim executar o arquivo corretamente
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoute.post("/", createUserController.execute); // cria um usuário

userRoute.post("/avatar", upload.single("file"), updateUserAvatarController.execute); // cria uma foto de usuário

export { userRoute }; // exporta para poder ser chamado
