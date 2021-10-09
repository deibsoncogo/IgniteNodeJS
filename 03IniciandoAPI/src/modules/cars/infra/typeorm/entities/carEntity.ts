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
}

export { CarEntity }; // exporta para poder ser chamado
