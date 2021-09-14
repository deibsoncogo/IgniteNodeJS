interface ICreateUserDTO { // cria uma tipagem para a criação de usuário
  name: string;
  userName: string;
  password: string;
  email: string;
  driverLicense: string;
}

export { ICreateUserDTO }; // exporta para poder ser chamado
