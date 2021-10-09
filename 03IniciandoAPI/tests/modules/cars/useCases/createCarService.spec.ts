import "reflect-metadata"; // importa a dependencia necessária para o tsyringe funcionar
import { CarRepositoryImMemory } from "../repositories/carRepositoryInMemory";
import { CreateCarService } from "@modules/cars/useCases/createCar/createCarService";
import { AppError } from "@shared/infra/http/errors/appError";

let carRepositoryImMemory: CarRepositoryImMemory; // cria uma variável para o repositório de carro
let createCarService: CreateCarService; // cria uma variável para o servico de criação de carro

describe("Criação de carro", () => { // cria um grupo de testes
  beforeEach(() => { // serve para executar um grupo de comandos antes de um teste
    carRepositoryImMemory = new CarRepositoryImMemory(); // cria o instanciamento do repositorio de carro
    createCarService = new CreateCarService(carRepositoryImMemory); // cria o instanciamento de servido do carro vinculado ao repositório
  });

  it("Deve ser capaz criar um novo carro", async () => { // cria um teste
    const car = await createCarService.execute({ // chama o servico de criação de carro
      name: "Nome do carro",
      description: "Descrição do carro",
      dailyRate: 111,
      licensePlate: "ABC-1D23",
      fineAmount: 22,
      brand: "Marca do carro",
      categoryId: "ID da categoria deste carro",
    });

    expect(car).toHaveProperty("id"); // verifica se existe o campo ID
  });

  it("Não deve ser capaz criar um novo carro com a mesma placa", () => { // cria um teste
    expect(async () => {
      await createCarService.execute({ // chama o servico de criação de carro
        name: "Nome do carro 11",
        description: "Descrição do carro 11",
        dailyRate: 333,
        licensePlate: "EFG-4H56",
        fineAmount: 44,
        brand: "Marca do carro 11",
        categoryId: "ID da categoria deste carro 11",
      });

      await createCarService.execute({
        name: "Nome do carro 22",
        description: "Descrição do carro 22",
        dailyRate: 5555,
        licensePlate: "EFG-4H56",
        fineAmount: 66,
        brand: "Marca do carro 22",
        categoryId: "ID da categoria deste carro 22",
      });
    }).rejects.toBeInstanceOf(AppError); // verifica se gerou um erro
  });

  it("Deve ser true o available do carro cadastrado", async () => { // cria um teste
    const car = await createCarService.execute({ // chama o servico de criação de carro
      name: "Nome do carro 33",
      description: "Descrição do carro 33",
      dailyRate: 777,
      licensePlate: "QWE-8R52",
      fineAmount: 88,
      brand: "Marca do carro 33",
      categoryId: "ID da categoria deste carro 33",
    });

    expect(car.available).toBe(true); // verifica se o valor do campo e verdadeiro
  });
});
