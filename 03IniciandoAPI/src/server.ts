import "reflect-metadata"; // esta dependência deve ser o primeiro de tudo
import "./database"; // o item importado vai funcionar em toda a aplicação
import "./shared/containers"; // vai disponibilizar o TSyringe para toda a aplicação
import express, { Request, Response, NextFunction } from "express"; // realiza a importação do framework
import "express-async-errors"; // dependência que vai lidar com os erros na aplicação
import swaggerUi from "swagger-ui-express"; // importa o arquivo index de rota
import { router } from "./routes"; // define o formato dos dados utilizado no request e response
import swaggerFile from "./swagger.json"; // dependencia que serve para criar uma documentação
import { AppError } from "@errors/appError";

const app = express(); // método para facilitar o uso

app.use(express.json());

app.use( // para executar o swagger
  "/docs", // rota da documentação
  swaggerUi.serve, // para criar o servidor
  swaggerUi.setup(swaggerFile), // onde está salvo a documentação em json
);

app.use(router); // permite a utilização das rotas

// middleware de tipo erro para lidar com eles
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) { // se o erro foi criado pelo arquivo AppError envia estas informações
    return response.status(err.statusCode).json({ message: err.message }); // retornar algo ao chamador
  }

  // se for um erro inesperado usamos esta formatação para dar a tratativa
  return response.status(500).json({ message: `Erro interno do servidor - ${err.message}` }); // retornar algo ao chamador
});

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server is running on port 3333"));
