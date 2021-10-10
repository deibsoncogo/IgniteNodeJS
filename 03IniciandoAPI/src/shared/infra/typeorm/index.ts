import { Connection, createConnection, getConnectionOptions } from "typeorm"; // itens que vai lidar com a criação da conexão do DB

// criação a conexão (Model <--> ORM <--> Banco de dados)
async function CreateConnection(host?: string): Promise<Connection> {
  const defaultOptions = await getConnectionOptions(); // instancia a função da dependencia

  return createConnection( // retorna algo ao chamador
    Object.assign(defaultOptions, { host }), // prepara a informação a retornar
  );
}

export { CreateConnection }; // exorta para poder ser chamado
