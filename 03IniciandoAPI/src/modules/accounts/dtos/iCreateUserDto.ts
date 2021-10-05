interface ICreateUserDto { // cria uma tipagem para a criação de usuário
  name: string;
  email: string;
  password: string;
  driverLicense: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDto }; // exporta para poder ser chamado
