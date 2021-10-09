import "reflect-metadata"; // importa a dependencia necessária para o tsyringe funcionar
import { CarRepositoryImMemory } from "../repositories/carRepositoryInMemory";
import { CreateCarService } from "@modules/cars/useCases/createCar/createCarService";

let carRepositoryImMemory: CarRepositoryImMemory; // cria uma variável para o repositório de carro
let createCarService: CreateCarService; // cria uma variável para o servico de criação de carro

describe("Criação de carro", () => { // cria um grupo de testes
  beforeEach(() => { // serve para executar um grupo de comandos antes de um teste
    carRepositoryImMemory = new CarRepositoryImMemory(); // cria o instanciamento do repositorio de carro
    createCarService = new CreateCarService(carRepositoryImMemory); // cria o instanciamento de servido do carro vinculado ao repositório
  });

  it("Deve ser capaz criar um novo carro", async () => { // cria um teste
    await createCarService.execute({ // chama o servico de criação de carro
      name: "Nome do carro",
      description: "Descrição do carro",
      dailyRate: 111,
      licensePlate: "ABC-1D23",
      fineAmount: 22,
      brand: "Marca do carro",
      categoryId: "ID da categoria deste carro",
    });
  });
});
