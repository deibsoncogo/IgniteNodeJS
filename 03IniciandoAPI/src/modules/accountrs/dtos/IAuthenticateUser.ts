interface IAuthenticateUser { // cria uma tipagem para a criação de usuário
  email: string;
  password: string;
}

export { IAuthenticateUser }; // exporta para poder ser chamado
