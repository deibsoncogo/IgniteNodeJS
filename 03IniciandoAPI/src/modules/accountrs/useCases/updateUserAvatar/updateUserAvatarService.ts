import { inject, injectable } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { IUpdateUserAvatarDto } from "../../dtos/iUpdateUserAvatarDto"; // importação da tipagem
import { UserEntity } from "../../entities/userEntity"; // importação da entidade
import { IUserRepository } from "../../repositories/iUserRepository"; // importação do contrato do repositório
import { DeleteFileUtil } from "@utils/deleteFileUtil";

@injectable() // para permite a injeção do TSyringe nesta classe
class UpdateUserAvatarService { // classe única
  constructor( // serve para criar algo quando for chamado pelo comando new
    @inject("UserRepository") // realiza a injeção do TSyringe
    private userRepository: IUserRepository, // criar o acesso ao repositório
  ) {}

  async execute({ userId, avatarFile }: IUpdateUserAvatarDto): Promise<UserEntity> { // função principal
    const user = await this.userRepository.findById(userId); // chama a função

    if (user.avatar) { // identifica se existe algum arquivo antes de chamar a função
      await DeleteFileUtil(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFile; // insere a foto no usuário vinculado ao bando de dados

    // cria um novo usuário com as nova alterações
    const userAvatar = await this.userRepository.create(user);

    return userAvatar; // retorna algo ao chamador
  }
}

export { UpdateUserAvatarService }; // exporta para poder ser chamado
