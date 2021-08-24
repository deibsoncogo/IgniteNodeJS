# Rocketseat - Curso Ignite | Node JS - Backend
Construa arquiteturas escaláveis e simples para a web utilizando uma linguagem flexível e popular
Um curso sobre o `backend` que será ensinado pela **Daniele Evangelista** utilizando como base o `Node JS` e o `TypeScript`

## Primeiro projeto com Node.js
Nesse módulo iremos criar nosso primeiro projeto com Node.js do total zero, colocando em prática todos os conceitos estudados no módulo inicial

## Execução do servidor
Utilize o comando abaixo instalar todas as dependência utilizada na aplicação
```bs
yarn
```

Para executar o servidor você pode usar o atalho abaixo ou seu comando por completo
```bs
yarn dev
yarn nodemon src/index.js
```

## Rotas
Endereço principal: `http://localhost/3333`

### Conta
**POST** /account - Essa rota será responsável por cadastrar um cliente - `application/json`
```ts
{ // schema body
  "cpf": number,
  "nome": string
}

// respostas
status(400).json({ error: "Já existe uma conta com este CPF!" });
status(201).json({ id: string, cpf: number, name: string }); // cadastro realizado
```

**DELETE** /account - Essa rota será responsável por excluir uma conta com saldo iguam a zero
```ts
{ // schema header
  "cpf": string || number
}

// respostas
status(400).json({ error: "Cliente não encontrado!" });
status(400).json({ error: "O saldo da conta é diferente de zero!" });
status(200).json({ message: "Conta do cliente excluída!" });
```

**GET** /account - Essa rota é responsável por carregar os dados do cliente com exceção das movimentações
```ts
{ // schema header
  "cpf": string || number
}

// respostas
status(400).json({ error: "Cliente não encontrado!" });
status(201).json({ id: string, cpf: number, name: string }); // conta do cliente
```

**PUT** /account - Essa rota é responsável por alterar o nome de um cliente - `application/json`
```ts
{ // schema header
  "cpf": string || number
}

{ // schema body
  "name": string
}

// respostas
status(400).json({ error: "Cliente não encontrado!" });
status(201).json({ message: "Nome do cliente alterado" });
```

### Movimentações
**POST** /deposit - Essa rota é responsável por cadastrar um deposito - `application/json`
```ts
{ // schema header
  "cpf": string || number
}

{ // schema body
  "description": string,
  "amount": number
}

// respostas
status(400).json({ error: "Cliente não encontrado!" });
status(400).json({ error: "O valor tem que ser maior que zero!" });
status(201).json({ description: string, amount: number, type: "credit", createdAt: date }); // deposito realizado
```

**POST** /withdraw - Essa rota é responsável por cadastrar um saque - `application/json`
```ts
{ // schema header
  "cpf": string || number
}

{ // schema body
  "description": string,
  "amount": number
}

// respostas
status(400).json({ error: "Cliente não encontrado!" });
status(400).json({ error: "O valor tem que ser maior que zero!" });
status(400).json({ error: "Saldo insuficiente!" });
status(201).json({ description: string, amount: number, type: "debit", createdAt: date }); // saque realizado
```

**POST** /transfer - Essa rota é responsável por cadastrar uma transferência - `application/json`
```ts
{ // schema header
  "cpf": string || number
}

{ // schema body
  "description": string,
  "cpfRecipient": string,
  "amount": number
}

// respostas
status(400).json({ error: "Cliente não encontrado!" });
status(400).json({ error: "O valor tem que ser maior que zero!" });
status(400).json({ error: "Conta destinatária não exite!" });
status(400).json({ error: "Saldo insuficiente!" });
status(201).json({ description: string, amount: number, type: "transfer sender", createdAt: date }, { description: string, amount: number, type: "transfer recipient", createdAt: date }); // transferência realizada
```

### Relatórios
**GET** /balance - Essa rota é responsável por retornar a somatório de todos os tipos de movimentações
```ts
{ // schema header
  "cpf": string || number
}

// respostas
status(400).json({ error: "Cliente não encontrado!" });
status(200).json({ balance: number, credit: number, debit: number, transferSender: number, transferRecipient: number }); // total das movimentações
```

**GET** /statement - Essa rota é responsável por listar todas movimentações de um cliente
```ts
{ // schema header
  "cpf": string || number
}

// respostas
status(400).json({ error: "Cliente não encontrado!" });
status(200).json([{ description: string, amount: number, type: string, createdAt: date }]); // todas movimentações
```

**GET** /statement/filter - Essa rota é responsável por listar todas movimentações de um cliente de uma data
```ts
{ // schema header
  "cpf": string || number
}

{ // schema query
  "date": string // (AAAA-MM-DD)
}

// respostas
status(400).json({ error: "Cliente não encontrado!" });
status(200).json([{ description: string, amount: number, type: string, createdAt: date }]); // todas movimentações
```
