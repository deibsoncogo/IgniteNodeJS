import express from "express"; // realiza a importação da dependência
import CreateCourse from "./route"; // realiza a importação do arquivo rota

const app = express(); // método para facilitar o uso

app.get("/", CreateCourse); // definição de uma rota

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server running on port 3333!"));
