import { Router } from "express"; // importa a dependência sobre rota
import multer from "multer";
import { EnsureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accountrs/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "../modules/accountrs/useCases/updateUserAvatar/updateUserAvatarController";
import { UploadSetting } from "../settings/uploadSetting";

const userRoute = Router(); // método que ajuda na programação

const uploadAvatar = multer(UploadSetting("./tmp/avatar")); // cria o upload para a foto do usuário

// realiza o instanciamento para assim executar o arquivo corretamente
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoute.post("/", createUserController.execute); // cria um usuário

userRoute.patch( // cria uma foto de usuário
  "/avatar", // caminho da rota
  EnsureAuthenticatedMiddleware, // chama o função que realiza a identificação de autorização
  uploadAvatar.single("avatar"), // chama a função para lidar com a importação
  updateUserAvatarController.execute, // cham os arquivos da rota
);

export { userRoute }; // exporta para poder ser chamado
