import { Router } from "express"; // importa a dependência sobre rota
import { CategoryRepository } from "../repositories/CategoryRepository"; // importa o arquivo criado

const categoryRoute = Router(); // método que ajuda na programação
const categoryRepository = new CategoryRepository(); // instancia para poder utilizar o arquivo

categoryRoute.post("/", (request, response) => { // cria uma categoria
  const { name, description } = request.body; // recebe os dados dentro da requisição

  const category = categoryRepository.create({ name, description }); // chama a função

  return response.status(201).json(category); // retornar algo ao chamado
});

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
