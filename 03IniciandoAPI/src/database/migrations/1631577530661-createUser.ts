import { MigrationInterface, QueryRunner, Table } from "typeorm"; // importações necessárias

export class createUser1631577530661 implements MigrationInterface { // classe principal
  public async up(queryRunner: QueryRunner): Promise<void> { // função de criação
    await queryRunner.createTable( // cria uma tabela
      new Table({ // necessário para especificar oque vai ter dentro da tabela
        name: "users", // nome da tabela
        columns: [ // define as colunas que ela vai ter
          {
            name: "id", // define o nome da coluna
            type: "uuid", // define o tipo de dados que vai salvar
            isPrimary: true, // define que é a coluna principal
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "userName",
            type: "varchar",
            isUnique: true, // define que não pode existir dado duplicado
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "driverLicense",
            type: "varchar",
          },
          {
            name: "isAdmin",
            type: "boolean",
            default: false, // define um valor a ser atribuido na criação
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> { // função de desfazer
    await queryRunner.dropTable("users"); // exclui uma tabela
  }
}
