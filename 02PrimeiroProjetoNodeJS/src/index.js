const express = require("express"); // realiza a importação da dependência
const { v4: uuidV4 } = require("uuid"); // realiza a importação da dependência e renomeia ela

const app = express(); // método que ajuda na utilização do express

app.use(express.json()); // configura o tipo de dados a ser trabalhado

const customers = []; // cria um banco de dados volátil

function VerifyExistAccountCpf(request, response, next) { // middleware para verificar se a conta existe
  const { cpf } = request.headers; // recebe as informações passada pelo cabeçalho

  // busca uma conta com este cpf
  const customerFind = customers.find((customer) => customer.cpf === cpf);

  if (!customerFind) { // vai barrar se não existir uma conta com este CPF
    return response.status(400).json({ error: "Não existe uma conta com este CPF" });
  }

  request.customerFind = customerFind; // salva as informações da conta dentro do request

  return next(); // faz o middleware seguir seu caminho
}

function GetBalance(statement) { // vai verificar o saldo da conta
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") { // verifica o tipo de movimentação
      return acc + operation.amount;
    }

    return acc - operation.amount;
  }, 0);

  return balance; // retorna algo para quem chamou a função
}

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

app.get("/statement", VerifyExistAccountCpf, (request, response) => { // consulta o estrado de uma conta
  const { customerFind } = request; // recebe as informações dentro do request

  return response.json(customerFind.statement); // retorna algo ao usuário
});

app.post("/deposit", VerifyExistAccountCpf, (request, response) => { // cria um deposito
  const { description, amount } = request.body; // recebe as informações passada pela requisição
  const { customerFind } = request; // recebe as informações dentro do request

  const deposit = { // prepara os sados a salvar
    id: uuidV4(),
    description,
    amount,
    type: "credit",
    createdAt: new Date(),
  };

  customerFind.statement.push(deposit); // salva os dados

  return response.status(201).json(deposit); // retorna algo ao usuário
});

app.post("/withdraw", VerifyExistAccountCpf, (request, response) => {
  const { description, amount } = request.body; // recebe as informações passada pela requisição
  const { customerFind } = request; // recebe as informações dentro do request

  const balance = GetBalance(customerFind.statement); // chama a função que vai verificar o saldo

  if (balance < amount) { // barra se o saldo for menor que o valor do saque
    return response.status(400).json({ error: "Saldo insuficiente" });
  }

  const withdraw = { // prepara os sados a salvar
    id: uuidV4(),
    description,
    amount,
    type: "debit",
    createdAt: new Date(),
  };

  customerFind.statement.push(withdraw); // salva os dados

  return response.status(400).json(withdraw); // retorna algo ao usuário
});

app.get("/statement/date", VerifyExistAccountCpf, (request, response) => { // consulta o estrado de uma conta
  const { date } = request.query; // recebe as informações no endereço (http://localhost:3000/user?page=2&order=desc)
  const { customerFind } = request; // recebe as informações dentro do request

  const dateFormat = new Date(`${date} 00:00`); // realizar uma formatação na data

  // extrai as movimentações com a data informada
  const statementFilter = customerFind.statement.filter((statement) => {
    return statement.createdAt.toDateString() === new Date(dateFormat).toDateString();
  });

  return response.json(statementFilter); // retorna algo ao usuário
});

app.put("/account", VerifyExistAccountCpf, (request, response) => {
  const { name } = request.body; // recebe as informações passada pela requisição
  const { customerFind } = request; // recebe as informações dentro do request

  customerFind.name = name; // salva o novo nome

  // retorna algo ao usuário
  return response.status(201).json({ message: `Nome alterado para ${name}` });
});

app.get("/account", VerifyExistAccountCpf, (request, response) => {
  const { customerFind } = request; // recebe as informações dentro do request

  return response.status(200).json(customerFind); // retorna algo ao usuário
});

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server running on port 3333!"));
