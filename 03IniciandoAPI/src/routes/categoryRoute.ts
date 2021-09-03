import { Router } from "express"; // importa a dependência sobre rota
import { CategoryRepository } from "../modules/cars/repositories/categoryRepository"; // importa o arquivo criado
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoryRoute = Router(); // método que ajuda na programação
const categoryRepository = new CategoryRepository(); // instancia para poder utilizar o arquivo

categoryRoute.post("/", (request, response) => { // cria uma categoria
  return createCategoryController.execute(request, response); // chama o controlador responsável
});

categoryRoute.get("/", (request, response) => { // lista as categorias
  const all = categoryRepository.list(); // chama a função

  return response.status(200).json(all); // retornar algo ao chamador
});

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
