import { createConnection, getConnectionOptions } from "typeorm"; // importa o ORM que iremos usar

interface IOptions { // definição dos dados recebido
  host: string;
}

// função para lidar com a conexão
getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = "database";
  // criação a conexão (Model/Entity <--> ORM <--> Banco de dados)
  createConnection({ ...options });
});
