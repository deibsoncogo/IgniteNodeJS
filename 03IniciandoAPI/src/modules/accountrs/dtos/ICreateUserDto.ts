interface ICreateUserDTO { // cria uma tipagem para a criação de usuário
  name: string;
  email: string;
  password: string;
  driverLicense: string;
}

export { ICreateUserDTO }; // exporta para poder ser chamado
