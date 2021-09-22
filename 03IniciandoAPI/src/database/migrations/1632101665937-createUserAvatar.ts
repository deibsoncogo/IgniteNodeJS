import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"; // importações necessárias

export class createUserAvatar1632101665937 implements MigrationInterface { // classe única
  public async up(queryRunner: QueryRunner): Promise<void> { // função de criação
    await queryRunner.addColumn("users", // seleciona a tabela
      new TableColumn({ // cria uma coluna para a tabela selecionada
        name: "avatar", // nome da coluna
        type: "varchar", // tipo de dado da coluna
        isNullable: true, // define que a coluna pode conter celulas vazia
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> { // função de desfazer
    await queryRunner.dropColumn( // exclui uma coluna de uma tabela
      "users", // seleciona a tabela
      "avatar", // seleciona a coluna
    );
  }
}
