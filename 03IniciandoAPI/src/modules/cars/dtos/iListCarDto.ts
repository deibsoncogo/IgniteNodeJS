// cria uma tipagem para a listagem de carros
interface IListCarDto {
  name?: string;
  brand?: string;
  categoryId?: string;
}

export { IListCarDto }; // exporta para poder ser chamado
