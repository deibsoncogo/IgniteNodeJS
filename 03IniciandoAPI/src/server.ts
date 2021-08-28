import express from "express"; // realiza a importação da dependência

const app = express(); // método para facilitar o uso

app.use(express.json()); // define o formato dos dados utilizado no request e response

app.post("/course", (request, response) => {
  const { name } = request.body;

  return response.status(201).json(name);
});

app.get("/", (request, response) => { // rota de teste
  return response.json({ message: "Hello world!" });
});

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server is running on port 3333"));
