import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"; // importação do TypeORM
import { v4 as uuidV4 } from "uuid"; // importa uma função desta dependência

@Entity("categories") // cria o vinculo com a tabela
class CategoryEntity { // tipagem para o banco de dados
  @PrimaryColumn() // configurações especificas para uma coluna primaria
  id?: string; // ? torna este dado opcional

  @Column() // define que estas são as configurações da coluna name
  name: string; // sem ? define que devemos ter este dado antes de tudo

  @Column() // não precisamos colocar o nome da coluna quando eles são igual
  description: string; // define o formato do dados a receber

  @CreateDateColumn() // configurações especificas para uma coluna de registro de criação
  createdAt: Date;

  constructor() { // serve como uma função para criar algo
    if (!this.id) { // vai identificar se já existe um ID
      this.id = uuidV4(); // cria um ID
    }
  }
}

export { CategoryEntity }; // exporta tudo para ser utilizado em outro local
