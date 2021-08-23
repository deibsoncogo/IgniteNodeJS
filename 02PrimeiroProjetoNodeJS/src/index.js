const express = require("express"); // realiza a importação da dependência
const { v4: uuidV4 } = require("uuid"); // realiza a importação da dependência e renomeia ela

const app = express(); // estáncia o Express permitindo utilizar ele

app.use(express.json()); // define que estamos trabalhando com JSON para no Express

const customers = []; // banco de dados volátil

function VerifyIfExistsAccountCpf(request, response, next) { // verifica se existe uma conta
  const { cpf } = request.headers; // recebe as informações passada pelo cabeçalho

  // extrai as movimentações deste cpf
  const customerFind = customers.find((customer) => customer.cpf === Number(cpf));

  if (!customerFind) { // identifica se existe uma conta cadastrada
    return response.status(400).json({ error: "Cliente não encontrado!" });
  }

  request.customerFind = customerFind; // envia esta informação para o request

  return next(); // finaliza este middleware e volta para a função anterior
}

function GetBalance(statement) { // calcula as entradas e saídas da conta
  // identifica cada tipo de movimentação e soma seus valores separadamente
  const { credit, debit, transferSender, transferRecipient } = statement.reduce((acc, ope) => {
    switch (ope.type) {
      case "credit": // identifica o tipo da movimentação
        acc.credit += ope.amount; // pega o valor atual e adiciona a este acumulado
        break; // volta para o inicio do loop
      case "debit":
        acc.debit += ope.amount;
        break;
      case "transfer sender":
        acc.transferSender += ope.amount;
        break;
      case "transfer recipient":
        acc.transferRecipient += ope.amount;
        break;
      default:
        break;
    }

    return acc; // retornar todos os valores
  }, { credit: 0, debit: 0, transferSender: 0, transferRecipient: 0 }); // valores inicias

  const balance = credit - debit - transferSender + transferRecipient; // descobre o saldo da conta

  return { balance, credit, debit, transferSender, transferRecipient }; // retorna os valores
}

app.post("/account", (request, response) => { // criar conta
  const { cpf, name } = request.body; // recebe as informações passada pela requisição

  // identifica se já existe uma conta este CPF
  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  if (customerAlreadyExists) { // impede o cadastro de conta com CPF já cadastrado
    return response.status(406).json({ error: "Já existe uma conta com este CPF!" });
  }

  const account = { // prepara os dados a salvar
    id: uuidV4(),
    cpf,
    name,
    statement: [],
  };

  customers.push(account); // salva os dados no banco de dados

  return response.status(201).json({ id: account.id, cpf: account.cpf, name: account.name }); // retorno ao usuário
});

app.delete("/account", VerifyIfExistsAccountCpf, (request, response) => { // excluir conta
  const { customerFind } = request; // recebe as informações dentro do request

  // analisa se existe alguma movimentação já cadastrada
  const { balance } = customerFind.statement ? GetBalance(customerFind.statement) : 0;

  if (balance !== 0) { // impede que a conta seja excluída se tiver saldo diferente de zero
    return response.status(406).json({ error: "O saldo da conta é diferente de zero!" });
  }

  customers.splice(customerFind, 1); // remove o item selecionado

  return response.status(200).json({ message: "Conta do cliente excluída!" }); // retorno ao usuário
});

app.get("/account", VerifyIfExistsAccountCpf, (request, response) => { // consultar dados da conta
  const { customerFind } = request; // recebe as informações dentro do request

  return response.status(201).json({ // retorno ao usuário
    id: customerFind.id,
    cpf: customerFind.cpf,
    name: customerFind.name,
  });
});

app.put("/account", VerifyIfExistsAccountCpf, (request, response) => { // alterar nome do cliente
  const { name } = request.body; // recebe as informações passada pela requisição
  const { customerFind } = request; // recebe as informações dentro do request

  customerFind.name = name; // salva o novo nome

  // retorno ao usuário
  return response.status(201).json({ message: "Nome do cliente alterado" });
});

app.post("/deposit", VerifyIfExistsAccountCpf, (request, response) => { // criar deposito
  const { description, amount } = request.body; // recebe as informações passada pela requisição
  const { customerFind } = request; // recebe as informações dentro do request

  if (amount <= 0) { // impede uma movimentação com o valor menor ou igual a zero
    return response.status(406).json({ error: "O valor tem que ser maior que zero!" });
  }

  const statementOperation = { // prepara os dados a salvar
    description,
    amount,
    type: "credit",
    createdAt: new Date(),
  };

  customerFind.statement.push(statementOperation); // salva os dados no banco de dados

  return response.status(201).json({ statementOperation }); // retorno ao usuário
});

app.post("/withdraw", VerifyIfExistsAccountCpf, (request, response) => { // criar saque
  const { description, amount } = request.body; // recebe as informações passada pela requisição
  const { customerFind } = request; // recebe as informações dentro do request

  if (amount <= 0) { // impede uma movimentação com o valor menor ou igual a zero
    return response.status(406).json({ error: "O valor tem que ser maior que zero!" });
  }

  const { balance } = GetBalance(customerFind.statement); // chama a função que traz o saldo

  if (balance < amount) { // verifica se o saldo é maior
    return response.status(400).json({ error: "Saldo insuficiente!" });
  }

  const statementOperation = { // prepara os dados a salvar
    description,
    amount,
    type: "debit",
    createdAt: new Date(),
  };

  customerFind.statement.push(statementOperation); // salva os dados no banco de dados

  return response.status(201).json({ statementOperation }); // retorno ao usuário
});

app.post("/transfer", VerifyIfExistsAccountCpf, (request, response) => { // criar transferência
  // recebe as informações passada pela requisição
  const { description, cpfRecipient, amount } = request.body;
  const { customerFind } = request; // recebe as informações dentro do request

  if (amount <= 0) { // impede uma movimentação com o valor menor ou igual a zero
    return response.status(406).json({ error: "O valor tem que ser maior que zero!" });
  }

  // recebe os dados da conta a enviar o dinheiro
  const accountRecipient = customers.find((customer) => customer.cpf === cpfRecipient);

  if (!accountRecipient) { // identifica se a conta é válida
    return response.status(406).json({ error: "Conta destinatária não exite!" });
  }

  const { balance } = GetBalance(customerFind.statement); // chama a função que traz o saldo

  if (balance < amount) { // verifica se o saldo é maior
    return response.status(400).json({ error: "Saldo insuficiente!" });
  }

  const transferSender = { // prepara os dados a salvar
    description,
    amount,
    type: "transfer sender",
    createdAt: new Date(),
  };

  const transferRecipient = { // prepara os dados a salvar
    description,
    amount,
    type: "transfer recipient",
    createdAt: new Date(),
  };

  customerFind.statement.push(transferSender); // salva os dados no BD
  accountRecipient.statement.push(transferRecipient); // salva os dados no BD

  return response.status(200).json({ transferSender, transferRecipient }); // retorno ao usuário
});

app.get("/balance", VerifyIfExistsAccountCpf, (request, response) => { // gerar balanço
  const { customerFind } = request; // recebe as informações dentro do request

  const {
    balance, credit, debit,
    transferSender, transferRecipient,
  } = GetBalance(customerFind.statement); // chama a função que calcula o saldo

  // retorno ao usuário
  return response.json({ balance, credit, debit, transferSender, transferRecipient });
});

app.get("/statement", VerifyIfExistsAccountCpf, (request, response) => { // listar movimentações
  const { customerFind } = request; // recebe as informações dentro do request

  response.status(200).json(customerFind.statement); // retorno ao usuário
});

app.get("/statement/filter", VerifyIfExistsAccountCpf, (request, response) => { // movimentações filtrada
  const { date } = request.query; // recebe as informações no endereço (http://localhost:3000/user?page=2&order=desc)
  const { customerFind } = request; // recebe as informações dentro do request

  const dateFormat = new Date(`${date} 00:00`); // cria uma hora padrão

  // filtra as movimentações conforme data
  const statementFilter = customerFind.statement.filter((statement) => {
    const value = statement.createdAt.toDateString() === new Date(dateFormat).toDateString();
    return value;
  });

  return response.status(200).json(statementFilter); // retorno ao usuário
});

// define a porta de execução do servidor
app.listen(3333, () => console.log("Server running on port 3333!"));
