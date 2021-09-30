import "reflect-metadata"; // importa a dependencia necessária para o tsyringe funcionar
import { AppError } from "../../../../src/errors/appError"; // importa o arquivo gerenciador de erros
import { CreateCategoryService } from "../../../../src/modules/cars/useCases/createCategory/createCategoryService"; // importa o servico de criação de categoria
import { CategoryRepositoryInMemory } from "../repositories/categoryRepositoryInMemory"; // importa o repositório volatil

let createCategoryService: CreateCategoryService; // cria a variavel para o serviço de categoria
let categoryRepositoryInMemory: CategoryRepositoryInMemory; // cria a variavel para o repositório de categoria

describe("Criação de categoria", () => { // cria um grupo para os teste
  beforeEach(() => { // serve para executar um grupo de comando antes de todos os testes
    categoryRepositoryInMemory = new CategoryRepositoryInMemory(); // instancia para criar o acesso ao repositório
    createCategoryService = new CreateCategoryService(categoryRepositoryInMemory); // instancia para criar o acesso ao serviço com o repositório vinculado
  });

  it("Deve ser capaz de criar uma nova categoria", async () => { // cria um teste
    const category = await createCategoryService.execute({ // chama o servico de criação de categoria
      name: "Nome da categoria teste",
      description: "Descrição da categoria teste",
    });

    expect(category).toHaveProperty("id"); // verifica se existe o campo ID
  });

  it("Não deve ser capaz de criar um categoria com o nome já existente", async () => { // cria um teste
    expect(async () => {
      const { name, description } = { // define os dados a utilizar desestruturado
        name: "Nome da categoria teste",
        description: "Descrição da categoria teste",
      };

      // chama o serviço de criação duas vezes
      await createCategoryService.execute({ name, description });
      await createCategoryService.execute({ name, description });
    }).rejects.toBeInstanceOf(AppError); // verifica se lançou um erro do arquivo AppError
  });
});
