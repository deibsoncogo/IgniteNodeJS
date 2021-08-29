import { Router } from "express"; // importa a dependência sobre rota
import { CategoryModel } from "../model/categoryModel";

const categoryRoute = Router(); // método que ajuda na programação

const categories: CategoryModel[] = []; // banco de dados volátil com tipagem

categoryRoute.post("/", (request, response) => { // cria uma categoria
  const { name, description } = request.body; // recebe os dados dentro da requisição

  // instancia para conseguimos utilizar o constructor dentro do arquivo chamado
  const category = new CategoryModel();

  // Object server para vincular dados a um objeto com facilidade
  Object.assign(category, { // prepara os dados antes de salvar
    name,
    description,
    createdAt: new Date(),
  });

  categories.push(category); // salva os dados dentro do banco de dados

  return response.status(201).json(category); // retornar algo ao chamado
});

export { categoryRoute }; // exporta todo o conteúdo para poder ser utilizado em outro arquivo
