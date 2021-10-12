import "reflect-metadata"; // importa a dependencia necessária para o tsyringe funcionar
import { CarRepositoryImMemory } from "../repositories/carRepositoryInMemory";
import { ListCarAvailableTrueFilterService } from "@modules/cars/useCases/listCarAvailableTrueFilter/listCarAvailableTrueFilterService";

let carRepositoryImMemory: CarRepositoryImMemory; // cria a variavel tipada para o repositório de carro
let listCarAvailableTrueFilterService: ListCarAvailableTrueFilterService; // cria a variavel tipada para o serviço de listagem de carros

describe("Listagem de carros", () => { // cria um grupo de testes
  beforeEach(() => { // serve para executar um grupo de comando antes de todos os testes
    carRepositoryImMemory = new CarRepositoryImMemory(); // instancia para criar o acesso ao repositório de carros volatil
    listCarAvailableTrueFilterService = new ListCarAvailableTrueFilterService(carRepositoryImMemory); // instancia para criar o acesso ao serviço de listagem de carros vinculado com o repositório de carro
  });

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

    await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 2",
      description: "Descrição teste 2",
      dailyRate: 21,
      licensePlate: "PLA-2T11",
      fineAmount: 22,
      brand: "Marca teste 2",
      categoryId: "Categoria ID teste 2",
    });

    carRepositoryImMemory.cars[1].available = false; // alterando a disponibilidade do carro 2

    // chama a função de listagem de carro
    const carValidAll = await listCarAvailableTrueFilterService.execute({});

    expect(carValidAll).toEqual([car1]); // verifica se o resultado foi o esperado
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

    await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 2",
      description: "Descrição teste 2",
      dailyRate: 21,
      licensePlate: "PLA-2T11",
      fineAmount: 22,
      brand: "Marca teste 2",
      categoryId: "Categoria ID teste 2",
    });

    carRepositoryImMemory.cars[1].available = false; // alterando a disponibilidade do carro 2

    // chama a função de listagem de carro com a filtragem por nome
    const carValidName = await listCarAvailableTrueFilterService.execute(
      { name: "Nome teste 3" },
    );

    expect(carValidName).toEqual([car3]); // verifica se o resultado foi o esperado
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

    await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 2",
      description: "Descrição teste 2",
      dailyRate: 21,
      licensePlate: "PLA-2T11",
      fineAmount: 22,
      brand: "Marca teste 2",
      categoryId: "Categoria ID teste 2",
    });

    carRepositoryImMemory.cars[1].available = false; // alterando a disponibilidade do carro 2

    // chama a função de listagem de carro com a filtragem pela marca
    const carValidBrand = await listCarAvailableTrueFilterService.execute(
      { brand: "Marca teste 5" },
    );

    expect(carValidBrand).toEqual([car5]); // verifica se o resultado foi o esperado
  });

  it("Deve ser possivel listar todos os carros disponiveis pelo ID da categoria", async () => { // cria uma regra
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

    await carRepositoryImMemory.create({ // chama a função de cadastro de carro
      name: "Nome teste 2",
      description: "Descrição teste 2",
      dailyRate: 21,
      licensePlate: "PLA-2T11",
      fineAmount: 22,
      brand: "Marca teste 2",
      categoryId: "Categoria ID teste 2",
    });

    carRepositoryImMemory.cars[1].available = false; // alterando a disponibilidade do carro 2

    // chama a função de listagem de carro com a filtragem pela categoria
    const carValidCategoryId = await listCarAvailableTrueFilterService.execute(
      { categoryId: "Categoria ID teste 7" },
    );

    expect(carValidCategoryId).toEqual([car7]); // verifica se o resultado foi o esperado
  });
});
