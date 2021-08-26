const express = require("express");

const app = express();

app.use(express.json()); // define o formato dos arquivos a receber

app.post("/course", (request, response) => { // método para criar algo
  // recebe a informação dentro da requisição
  const { name } = request.body;

  // retorna algo ao usuário
  return response.status(201).json([["Curso 4", "Curso 2", "Curso 1", "Curso 3"], [name]]);
});

app.get("/course", (request, response) => { // método para realizar consulta
  // recebe a informação pelo link do endereço (http://localhost:3000/user?page=1&order=desc)
  const { page, order } = request.query;

  // retorna algo ao usuário
  return response.status(200).json([["Curso 1", "Curso 2", "Curso 3", "Curso 4"], [page, order]]);
});

app.put("/course/:id", (request, response) => { // método para alterar várias coisas
  // recebe a informação pelo link do endereço (http://localhost:3000/user/123)
  const { id } = request.params;

  // retorna algo ao usuário
  return response.status(201).json([["Curso 5", "Curso 6", "Curso 3", "Curso 4"], [id]]);
});

app.patch("/course/:id", (request, response) => { // método para alterar uma coisa
  // recebe a informação pelo link do endereço (http://localhost:3000/user/4567)
  const { id } = request.params;

  // retorna algo ao usuário
  return response.status(201).json([["Curso 5", "Curso 6", "Curso 7", "Curso 4"], [id]]);
});

app.delete("/course/:id", (request, response) => { // método para deletar algo
  // recebe a informação pelo link do endereço (http://localhost:3000/user/890)
  const { id } = request.params;

  // retorna algo ao usuário
  return response.status(201).json([["Curso 5", "Curso 6", "Curso 7"], [id]]);
});

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server running on port 3333!"));
