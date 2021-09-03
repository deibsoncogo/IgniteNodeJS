import { Router } from "express"; // importa a dependência sobre rota
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategory";

const categoryRoute = Router(); // método que ajuda na programação

categoryRoute.post("/", (request, response) => { // cria uma categoria
  return createCategoryController.execute(request, response); // chama o controlador responsável
});

categoryRoute.get("/", (request, response) => { // lista as categorias
  return listCategoryController.execute(request, response); // chama o controlador responsável
});

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
