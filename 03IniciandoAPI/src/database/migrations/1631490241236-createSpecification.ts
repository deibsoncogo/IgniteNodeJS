import { MigrationInterface, QueryRunner, Table } from "typeorm"; // importações necessárias

export class createSpecification1631490241236 implements MigrationInterface { // classe principal
  public async up(queryRunner: QueryRunner): Promise<void> { // função de criação
    await queryRunner.createTable( // cria uma tabela
      new Table({ // necessário para especificar oque vai ter dentro da tabela
        name: "specifications", // nome da tabela
        columns: [ // define as colunas que ela vai ter
          {
            name: "id",
            type: "uuid",
            isPrimary: true, // define que é a coluna principal
          },
          {
            name: "name", // define o nome da coluna
            type: "varchar", // define o tipo de dados que vai salvar
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()", // define um valor a ser utilizado na inserção de dados
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> { // função de desfazer
    await queryRunner.dropTable("specifications"); // exclui uma tabela
  }
}
