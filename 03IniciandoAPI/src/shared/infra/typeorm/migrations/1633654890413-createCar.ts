import { MigrationInterface, QueryRunner, Table } from "typeorm"; // importações necessárias

export class createCar1633654890413 implements MigrationInterface { // classe única
  public async up(queryRunner: QueryRunner): Promise<void> { // função de criação
    queryRunner.createTable( // cria uma tabela
      new Table({ // necessário para especificar oque vai ter dentro da tabela
        name: "cars", // nome da tabela
        columns: [ // define as colunas que ela vai ter
          {
            name: "id",
            type: "uuid",
            isPrimary: true, // define que é a coluna principal
          },
          {
            name: "name", // define o nome da coluna
            type: "varchar", // define o tipo de dados texto para salvar
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "dailyRate",
            type: "numeric", // define o tipo de dados numérico para salvar
          },
          {
            name: "available",
            type: "boolean", // define o tipo de dados verdadeiro ou falso para salvar
            default: true, // define um valor a ser atribuido na criação
          },
          {
            name: "licensePlate",
            type: "varchar",
          },
          {
            name: "fineAmount",
            type: "numeric",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "categoryId",
            type: "uuid",
            isNullable: true, // permite receber o valor de nulo
          },
          {
            name: "createdAt",
            type: "timestamp", // define o tipo de dados data e hora para salvar
            default: "now()", // define um valor a ser utilizado na inserção de dados
          },
        ],
        foreignKeys: [ // configuração para criar uma chave estrangeira
          {
            name: "FKCategoryCar", // define um nome único da chave
            referencedTableName: "categories", // define de qual tabela retirar o valor
            referencedColumnNames: ["id"], // define a coluna que iremos usar
            columnNames: ["categoryId"], // define a coluna a salvar
            onDelete: "SET NULL", // se a informação for excluida a chave recebe o valor de nulo
            onUpdate: "SET NULL", // se a informação for alterar a chave recebe o valor de nulo se for necessário
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> { // função de desfazer
    queryRunner.dropTable("cars"); // exclui uma tabela
  }
}
