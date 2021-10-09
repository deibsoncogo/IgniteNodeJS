import { hash } from "bcryptjs"; // dependencia para lidar com criptografia de dados
import { v4 as uuidV4 } from "uuid"; // dependencia para lidar com ID
import { CreateConnection } from "../index";

// assincrona função que vai criar o usuário administrador interno
async function CreateInternalAdminUser() {
  const connection = await CreateConnection("localhost"); // instancia a conexão

  const id = uuidV4(); // cria um ID para o usuário
  const password = await hash("admin", 8); // cria uma senha criptografada para o usuário

  await connection.query( // cria a informação dentro do banco de dados
    `INSERT INTO USERS(id, name, email, password, "driverLicense", "isAdmin", "createdAt")
      values('${id}', 'admin', 'admin@teste.com.br', '${password}', 123, true, 'now()')`,
  );

  connection.close; // encerra a conexão
}

// chama a função que vai criar o usuário administrador interno
CreateInternalAdminUser().then(() => console.log("Usuário interno administrador criado"));
