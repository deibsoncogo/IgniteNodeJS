# Rocketseat - Curso Ignite | Node JS - Backend
Construa arquiteturas escaláveis e simples para a web utilizando uma linguagem flexível e popular
Um curso sobre o `backend` que será ensinado pela **Daniele Evangelista** utilizando como base o `Node JS` e o `TypeScript`

## Fundamentos do Node JS
Nesse módulos nós vamos conhecer os conceitos do Node JS, como é o seu funcionamento e os motivos pelo qual ele foi criado, iremos estudar sobre os conceitos e regras por trás de uma API Rest, os métodos HTTPs, os principais códigos de retornos e tipos de parâmetros de uma requisição.

>Este projeto serve para simular o funcionamento de um sistema

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

### Curso
**POST** /course - A rota vai simular a criação de uma nova informação - `application/json`
```ts
{ // schema body
  "nome": string
}

// resposta
status(201).json([["Curso 4", "Curso 2", "Curso 1", "Curso 3"], [name]])
```

**GET** /course - A rota vai simular a ordenação das informações de forma crescente
```ts
{ // schema query
  "page": string,
  "order": string
}

// resposta
status(200).json([["Curso 1", "Curso 2", "Curso 3", "Curso 4"], [page, order]])
```

**PUT** /course/{id} - A rota vai simular a alteração de várias informações
```ts
{ // schema params
  "id": string
}

// resposta
status(201).json([["Curso 5", "Curso 6", "Curso 3", "Curso 4"], [id]])
```

**PATCH** /course/{id} - A rota vai simular a alteração de uma informação
```ts
{ // schema params
  "id": string
}

// resposta
status(201).json([["Curso 5", "Curso 6", "Curso 7", "Curso 4"], [id]])
```

**DELETE** /course/{id} - A rota vai simular a exclusão de uma informação
```ts
{ // schema params
  "id": string
}

// resposta
status(201).json([["Curso 5", "Curso 6", "Curso 7"], [id]]);
```
