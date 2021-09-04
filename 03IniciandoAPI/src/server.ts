import express from "express"; // realiza a importação da dependência
import { router } from "./routes"; // importa o arquivo index de rota

const app = express(); // método para facilitar o uso

app.use(express.json()); // define o formato dos dados utilizado no request e response

app.use(router); // permite a utilização das rotas

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server is running on port 3333"));
