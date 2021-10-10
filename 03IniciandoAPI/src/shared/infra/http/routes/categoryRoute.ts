import { Router } from "express"; // importação que vai lidar com as rotas
import multer from "multer"; // dependencia que vai lidar com importações de arquivos
import { CreateCategoryController } from "@cars/useCases/createCategory/createCategoryController";
import { ImportCategoryController } from "@cars/useCases/importCategory/importCategoryController";
import { ListCategoryController } from "@cars/useCases/listCategory/listCategoryController";
import { EnsureAuthenticatedMiddleware } from "@middlewares/ensureAuthenticatedMiddleware";
import { EnsureUserAdminMiddleware } from "@middlewares/ensureUserAdminMiddleware";

const categoryRoute = Router(); // método que ajuda na programação

const upload = multer({ // método para configurar e ajudar na utilização do mesmo
  dest: "./tmp", // local de salvamento do arquivo recebido
});

// realiza o instanciamento para assim executar o arquivo corretamente
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoryRoute.get("/", listCategoryController.execute); // lista as categorias

categoryRoute.use(EnsureAuthenticatedMiddleware, EnsureUserAdminMiddleware); // aplicação de alguns middleware
categoryRoute.post("/", createCategoryController.execute); // cria uma categoria
categoryRoute.post("/import", upload.single("file"), importCategoryController.execute); // importação de categoria

export { categoryRoute }; // exporta para poder ser chamado
