import "reflect-metadata"; // importa a dependencia necessária para o tsyringe funcionar
import { CarRepositoryImMemory } from "../repositories/carRepositoryInMemory";
import { ListCarService } from "@modules/cars/useCases/listCar/listCarService";

let carRepositoryImMemory: CarRepositoryImMemory; // cria a variavel tipada para o repositório de carro
let listCarService: ListCarService; // cria a variavel tipada para o serviço de listagem de carros

describe("Listagem de carros", () => { // cria um grupo de testes
  beforeEach(() => { // serve para executar um grupo de comando antes de todos os testes
    carRepositoryImMemory = new CarRepositoryImMemory(); // instancia para criar o acesso ao repositório de carros volatil
    listCarService = new ListCarService(carRepositoryImMemory); // instancia para criar o acesso ao serviço de listagem de carros vinculado com o repositório de carro
  });

  // O TESTE AINDA NÃO ESTÁ VERIFICANDO SE ESTÁ RETORNANDO SOMENTE OS CARROS DISPONIVEIS
  it("Deve ser possivel listar todos os carros disponiveis", async () => { // cria um teste
    const car1 = await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 1",
      description: "Descrição teste 1",
      dailyRate: 11,
      licensePlate: "PLA-1T11",
      fineAmount: 12,
      brand: "Marca teste 1",
      categoryId: "Categoria ID teste 1",
    });

    // chama a função de listagem de carro
    const carAllAvailableTrue = await listCarService.execute({});

    expect(carAllAvailableTrue).toEqual([car1]); // verifica se o resultado foi o esperado
  });

  it("Deve ser possivel listar todos os carros disponiveis pelo nome", async () => { // cria uma regra
    const car3 = await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 3",
      description: "Descrição teste 3",
      dailyRate: 31,
      licensePlate: "PLA-3T11",
      fineAmount: 32,
      brand: "Marca teste 3",
      categoryId: "Categoria ID teste 3",
    });

    await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 4",
      description: "Descrição teste 4",
      dailyRate: 41,
      licensePlate: "PLA-4T11",
      fineAmount: 42,
      brand: "Marca teste 4",
      categoryId: "Categoria ID teste 4",
    });

    // chama a função de listagem de carro com a filtragem por nome
    const carAllAvailableTrueName = await listCarService.execute({ name: "Nome teste 3" });

    expect(carAllAvailableTrueName).toEqual([car3]); // verifica se o resultado foi o esperado
  });

  it("Deve ser possivel listar todos os carros disponiveis pela marca", async () => { // cria uma regra
    const car5 = await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 5",
      description: "Descrição teste 5",
      dailyRate: 51,
      licensePlate: "PLA-5T11",
      fineAmount: 52,
      brand: "Marca teste 5",
      categoryId: "Categoria ID teste 5",
    });

    await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 6",
      description: "Descrição teste 6",
      dailyRate: 61,
      licensePlate: "PLA-6T11",
      fineAmount: 62,
      brand: "Marca teste 6",
      categoryId: "Categoria ID teste 6",
    });

    // chama a função de listagem de carro com a filtragem pela marca
    const carAllAvailableTrueName = await listCarService.execute({ brand: "Marca teste 5" });

    expect(carAllAvailableTrueName).toEqual([car5]); // verifica se o resultado foi o esperado
  });

  it("Deve ser possivel listar todos os carros disponiveis pela categoria", async () => { // cria uma regra
    const car7 = await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 7",
      description: "Descrição teste 7",
      dailyRate: 71,
      licensePlate: "PLA-7T11",
      fineAmount: 72,
      brand: "Marca teste 7",
      categoryId: "Categoria ID teste 7",
    });

    await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 8",
      description: "Descrição teste 8",
      dailyRate: 81,
      licensePlate: "PLA-8T11",
      fineAmount: 82,
      brand: "Marca teste 8",
      categoryId: "Categoria ID teste 8",
    });

    // chama a função de listagem de carro com a filtragem pela categoria
    const carAllAvailableTrueName = await listCarService.execute(
      { categoryId: "Categoria ID teste 7" },
    );

    expect(carAllAvailableTrueName).toEqual([car7]); // verifica se o resultado foi o esperado
  });
});
