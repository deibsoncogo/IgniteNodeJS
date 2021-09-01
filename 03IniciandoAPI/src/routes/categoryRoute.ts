import { Router } from "express"; // importa a dependência sobre rota
import { CategoryRepository } from "../repositories/categoryRepository"; // importa o arquivo criado
import { CreateCategoryService } from "../services/createCategoryService"; // importa o arquivo criado

const categoryRoute = Router(); // método que ajuda na programação
const categoryRepository = new CategoryRepository(); // instancia para poder utilizar o arquivo

categoryRoute.post("/", (request, response) => { // cria uma categoria
  const { name, description } = request.body; // recebe os dados dentro da requisição

  // instancia para poder utilizar todos recursos criando um vinculo com o repositório
  const createCategoryService = new CreateCategoryService(categoryRepository);

  const category = createCategoryService.execute({ name, description }); // chama a função

  return response.status(201).json(category); // retornar algo ao chamado
});

categoryRoute.get("/", (request, response) => { // lista as categorias
  const all = categoryRepository.list(); // chama a função

  return response.status(200).json(all); // retornar algo ao chamador
});

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
