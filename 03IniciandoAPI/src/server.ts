import express from "express"; // realiza a importação da dependência
import { categoryRoute } from "./routes/categoryRoute"; // importa o arquivo de rota de categoria

const app = express(); // método para facilitar o uso

app.use(express.json()); // define o formato dos dados utilizado no request e response

app.use(categoryRoute); // cria uma rota para as categorias

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server is running on port 3333"));
