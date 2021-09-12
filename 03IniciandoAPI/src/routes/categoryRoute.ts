import { Router } from "express"; // importa a dependência sobre rota
import multer from "multer"; // dependencia que lida com importações csv
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/createCategoryController";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategory";

const categoryRoute = Router(); // método que ajuda na programação

const upload = multer({ // método para configurar e ajudar na utilização do mesmo
  dest: "./tmp", // local de salvamento do arquivo recebido
});

// realiza os instanciamento para podemos utilizar os arquivos corretamente
const createCategoryController = new CreateCategoryController();

categoryRoute.post("/", createCategoryController.execute); // cria uma categoria

categoryRoute.get("/", (request, response) => { // lista as categorias
  return listCategoryController.execute(request, response); // chama o controlador responsável
});

categoryRoute.post("/import", upload.single("file"), (request, response) => { // importação de categoria
  return importCategoryController.execute(request, response); // chama o controlador responsável
});

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
