import { Router } from "express"; // importação que vai lidar com as rotas
import multer from "multer"; // dependencia que vai lidar com importações de arquivos
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

userRoute.use(EnsureAuthenticatedMiddleware); // aplicação de alguns middleware
userRoute.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.execute); // cria uma foto para o usuário

export { userRoute }; // exporta para poder ser chamado
