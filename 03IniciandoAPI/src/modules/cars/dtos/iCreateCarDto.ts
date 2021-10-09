interface ICreateCarDto { // cria uma tipagem para a criação de um carro
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

export { ICreateCarDto }; // exporta para poder ser chamado
