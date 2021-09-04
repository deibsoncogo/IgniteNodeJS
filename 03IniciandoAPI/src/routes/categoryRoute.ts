import { Router } from "express"; // importa a dependência sobre rota
import multer from "multer"; // dependencia que lida com importações csv
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategory";

const categoryRoute = Router(); // método que ajuda na programação

const upload = multer({ // método para configurar e ajudar na utilização do mesmo
  dest: "./tmp", // local de salvamento do arquivo recebido
});

categoryRoute.post("/", (request, response) => { // cria uma categoria
  return createCategoryController.execute(request, response); // chama o controlador responsável
});

categoryRoute.get("/", (request, response) => { // lista as categorias
  return listCategoryController.execute(request, response); // chama o controlador responsável
});

categoryRoute.post("/import", upload.single("file"), (request, response) => { // importação de categoria
  const { file } = request; // recebe o arquivo enviado

  return response.json(file); // retorna algo ao chamador
});

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
