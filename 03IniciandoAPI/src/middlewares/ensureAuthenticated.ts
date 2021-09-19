import { Request, Response, NextFunction } from "express"; // framework muito importante para nossa aplicação
import { verify } from "jsonwebtoken"; // dependência sobre token json
import { UserRepository } from "../modules/accountrs/repositories/implementations/userRepository";

interface IToken { // tipagem do token
  // iat?: number; // interrogação torna a tipagem opcional
  // exp?: number; // define a tipagem no formato de número
  sub: string; // define a tipagem no formato de texto
}

async function EnsureAuthenticatedMiddleware( // função unica que será nosso middleware
  request: Request, response: Response, next: NextFunction,
) {
  const authHeader = request.headers.authorization; // recebe os dados pelo cabeçalho no campo padrão de autorização

  if (!authHeader) { // vai barrar se não receber o token
    throw new Error("Token não informado");
  }

  // por padrão o token vem com a palavra Bearer na frente
  const [, token] = authHeader.split(" "); // vamos usar a função split para remover a palavra Bearer

  try { // serve para captar um erro no sistema
    // usamos a função verify junto da nossa palavra chave para ver se o token é válido
    // dois ponto renomea a variável e as vincula o dado com a tipagem
    const { sub: userId } = verify(token, "c8011c6fb0020c80a2bedfbcd3074dc4") as IToken;

    const userRepository = new UserRepository(); // cria o acesso ao repositório de usuário

    const user = await userRepository.findById(userId); // chama a função que busca um usuário pelo ID

    if (!user) { // vai barrar se o ID informado não existir
      throw new Error("Usuário não encontrado");
    }

    next(); // faz o middleware finalizar assim voltando para o chamador
  } catch { // serve para captar um erro
    throw new Error("Token inválido"); // retornar este erro ao chamador
  }
}

export { EnsureAuthenticatedMiddleware }; // exporta para poder ser chamado
