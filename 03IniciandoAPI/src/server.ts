import express from "express"; // realiza a importação da dependência

const app = express(); // método para facilitar o uso

app.get("/", (request, response) => { // rota de teste
  return response.json({ message: "Hello world!" });
});

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server is running on port 3333!"));
