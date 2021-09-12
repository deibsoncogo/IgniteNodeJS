import { Router } from "express"; // importa a dependência sobre rota
import multer from "multer"; // dependencia que lida com importações csv
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/createCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoryController } from "../modules/cars/useCases/listCategory/listCategoryController";

const categoryRoute = Router(); // método que ajuda na programação

const upload = multer({ // método para configurar e ajudar na utilização do mesmo
  dest: "./tmp", // local de salvamento do arquivo recebido
});

// realiza os instanciamento para podemos utilizar os arquivos corretamente
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoryRoute.post("/", createCategoryController.execute); // cria uma categoria
categoryRoute.get("/", listCategoryController.execute); // lista as categorias
categoryRoute.post("/import", upload.single("file"), importCategoryController.execute); // importação de categoria

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
