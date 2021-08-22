const express = require("express"); // realiza a importação da dependência
const { v4: uuidV4 } = require("uuid"); // realiza a importação da dependência e renomeia ela

const app = express(); // método que ajuda na utilização do express

app.use(express.json()); // configura o tipo de dados a ser trabalhado

const customers = []; // cria um banco de dados volátil

app.post("/account", (request, response) => { // cria uma conta
  const { cpf, name } = request.body; // recebe as informações passada pela requisição

  // verificar se o cpf já está cadastrado no banco de dados
  const cpfAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  if (cpfAlreadyExists) { // barra o cadastro de uma conta com um cpf já salvo
    return response.status(400).json({ error: "Já existe uma conta com este CPF" });
  }

  const customer = { // prepara os sados a salvar
    id: uuidV4(),
    cpf,
    name,
    statement: [],
  };

  customers.push(customer); // salva os dados

  return response.status(201).json(customer); // retorna algo ao usuário
});

app.get("/statement/:cpf", (request, response) => { // consulta o estrado de uma conta
  const { cpf } = request.params; // recebe as informações passada pelo endereço (http://localhost:3333/statement/11)

  // busca uma conta com este cpf
  const customerFind = customers.find((customer) => customer.cpf === cpf);

  return response.json(customerFind.statement); // retorna algo ao usuário
});

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server running on port 3333!"));
