import { v4 as uuidV4 } from "uuid"; // dependencia para lidar com ID

class CarEntity { // cria uma classe que iremos usar para o sistema com o DB
  id: string; // define o nome e o tipo de dados da coluna

  name: string;

  description: string;

  dailyRate: number;

  available: boolean;

  licensePlate: string;

  fineAmount: number;

  brand: string;

  categoryId: string;

  createdAt: Date;

  constructor() { // serve para criar algo quando é chamado pelo comando new
    if (!this.id) { // verifica se já existe um ID criado
      this.id = uuidV4(); // cria um ID
      this.available = true; // define como verdadeiro o valor do campo
      this.createdAt = new Date(); // define a data e hora atual o valor do campo
    }
  }
}

export { CarEntity }; // exporta para poder ser chamado
