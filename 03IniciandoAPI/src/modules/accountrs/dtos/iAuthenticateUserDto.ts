interface IAuthenticateUserDto { // cria uma tipagem para a criação de usuário
  email: string;
  password: string;
}

export { IAuthenticateUserDto }; // exporta para poder ser chamado
