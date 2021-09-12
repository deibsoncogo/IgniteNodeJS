import "reflect-metadata"; // esta dependência deve ser o primeiro de tudo
import "./database"; // o item importado vai funcionar em toda a aplicação
import "./shared/containers"; // vai disponibilizar o TSyringe para toda a aplicação
import express from "express"; // realiza a importação da dependência
import swaggerUi from "swagger-ui-express"; // importa o arquivo index de rota
import { router } from "./routes"; // define o formato dos dados utilizado no request e response
import swaggerFile from "./swagger.json"; // dependencia que serve para criar uma documentação

const app = express(); // método para facilitar o uso

app.use(express.json());

app.use( // para executar o swagger
  "/docs", // rota da documentação
  swaggerUi.serve, // para criar o servidor
  swaggerUi.setup(swaggerFile), // onde está salvo a documentação em json
);

app.use(router); // permite a utilização das rotas

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server is running on port 3333"));
