import { Router } from "express"; // importa a dependência sobre rota

const categoryRoute = Router(); // método que ajuda na programação

const categories = []; // banco de dados volátil

categoryRoute.post("/category", (request, response) => { // cria uma categoria
  const { name, description } = request.body; // recebe os dados dentro da requisição

  const category = { name, description }; // prepara os dados antes de salvar

  categories.push(category); // salva os dados dentro do banco de dados

  return response.status(201).json(category); // retornar algo ao chamado
});

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
