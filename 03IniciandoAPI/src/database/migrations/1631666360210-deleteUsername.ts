import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"; // importações necessárias

export class deleteUsername1631666360210 implements MigrationInterface { // grupo principal
  public async up(queryRunner: QueryRunner): Promise<void> { // função de criação
    await queryRunner.dropColumn("users", "userName"); // remove uma coluna da tabela
  }

  public async down(queryRunner: QueryRunner): Promise<void> { // função de desfazer
    await queryRunner.addColumn("users", new TableColumn({ // cria uma coluna
      name: "userName", // na da coluna a criar
      type: "varchar", // tipo de dados da coluna
    }));
  }
}
