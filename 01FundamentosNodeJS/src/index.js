const express = require("express");

const app = express();

app.post("/course", (request, response) => { // método para criar algo
  return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

app.get("/course", (request, response) => { // método para realizar consulta
  return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.put("/course/:id", (request, response) => { // método para alterar várias coisas
  return response.json(["Curso 5", "Curso 6", "Curso 3", "Curso 4"]);
});

app.patch("/course/:id", (request, response) => { // método para alterar uma coisa
  return response.json(["Curso 5", "Curso 6", "Curso 7", "Curso 4"]);
});

app.delete("/course/:id", (request, response) => { // método para deletar algo
  return response.json(["Curso 5", "Curso 6", "Curso 7"]);
});

app.listen(3333, () => console.log("Server running on port 3333!"));
