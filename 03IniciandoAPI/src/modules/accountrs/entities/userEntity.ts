import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"; // importação do TypeORM
import { v4 as uuidV4 } from "uuid"; // importa uma função desta dependência

@Entity("users") // cria o vinculo com a tabela
class UserEntity { // tipagem para o banco de dados
  @PrimaryColumn() // configuração especifica para uma coluna primaria
  id: string; // define o formato do dados a receber

  @Column() // define que estas são as configurações da coluna name
  name: string;

  @Column() // não precisamos colocar o nome da coluna quando eles são iguais
  userName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driverLicense: string;

  @Column()
  isAdmin: boolean; // define o formato de verdadeiro ou falso

  @CreateDateColumn() // configuração especifica para uma coluna de registro de criação
  createdAt: Date;

  constructor() { // serve como uma função para criar algo
    if (!this.id) { // vai identificar se já existe um ID
      this.id = uuidV4(); // cria um ID
    }
  }
}

export { UserEntity }; // exporta para poder ser chamado em outro local
