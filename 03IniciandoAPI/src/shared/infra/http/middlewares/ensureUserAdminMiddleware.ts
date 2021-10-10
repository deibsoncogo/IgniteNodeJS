import { Request, Response, NextFunction } from "express"; // importação para lidar com o recebimento e envio de informação
import { AppError } from "@errors/appError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/userRepository";

// função que serviram como um middleware para verificar se o usuário é administrador
async function EnsureUserAdminMiddleware(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  const { userId } = request; // recebe os dados

  const userRepository = new UserRepository(); // instancia criando o acesso ao repositório
  const user = await userRepository.findById(userId); // busca um usuário pelo ID

  if (!user.isAdmin) { // o usuário será barrado se não for administrador
    throw new AppError("O usuário não é administrador");
  }

  next(); // encerra o middleware voltando para o chamador
}

export { EnsureUserAdminMiddleware }; // exporta para poder ser chamado
