import { Router } from "express"; // importa a dependência sobre rota
import { v4 as uuidV4 } from "uuid";

const categoryRoute = Router(); // método que ajuda na programação

const categories = []; // banco de dados volátil

categoryRoute.post("/", (request, response) => { // cria uma categoria
  const { name, description } = request.body; // recebe os dados dentro da requisição

  const category = { id: uuidV4(), name, description }; // prepara os dados antes de salvar

  categories.push(category); // salva os dados dentro do banco de dados

  return response.status(201).json(category); // retornar algo ao chamado
});

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
