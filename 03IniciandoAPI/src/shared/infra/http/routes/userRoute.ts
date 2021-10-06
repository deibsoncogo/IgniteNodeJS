import { Router } from "express"; // framework principal que neste caso vai lidar com as rotas
import multer from "multer"; // dependencia para lidar com importação de arquivos
import { CreateUserController } from "@accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "@accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { EnsureAuthenticatedMiddleware } from "@middlewares/ensureAuthenticatedMiddleware";
import { UploadSetting } from "@settings/uploadSetting";

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
