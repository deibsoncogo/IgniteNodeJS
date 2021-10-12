import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"; // importações para lidar com a criação de uma migration

// classe responsavel para executar a criação da tabela SpecificationsCars
export class createSpecificationCar1634069311983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> { // função de criação
    await queryRunner.createTable( // criar uma tabela
      new Table({ // para informar as especificações da tabela
        name: "specificationsCars", // define o nome da tabela
        columns: [ // para informar as colunas
          {
            name: "carId", // nome da coluna
            type: "uuid", // tipo de dado que vai receber
          },
          {
            name: "specificationId",
            type: "uuid",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()", // define um valor padrão
          },
        ],
      }),
    );

    await queryRunner.createForeignKey( // cria uma chave estrangeira
      "specificationsCars", // nome da tabela a criar a chave estrangeira
      new TableForeignKey({ // onde devemos colocar as informações da chave
        name: "FKCarIdSpecificationsCars", // define um nome único da chave
        referencedTableName: "cars", // define de qual tabela retirar o valor
        referencedColumnNames: ["id"], // define de qual coluna da tabela retirar o valor
        columnNames: ["carId"], // define a coluna a salvar
        onDelete: "SET NULL", // se a informação for excluida a chave recebe o valor de nulo
        onUpdate: "SET NULL", // se a informação for alterar a chave recebe o valor de nulo se for necessário
      }),
    );

    await queryRunner.createForeignKey( // cria uma chave estrangeira
      "specificationsCars", // nome da tabela a criar a chave estrangeira
      new TableForeignKey({ // onde devemos colocar as informações da chave
        name: "FKSpecificationIdSpecificationsCars", // define um nome único da chave
        referencedTableName: "specifications", // define de qual tabela retirar o valor
        referencedColumnNames: ["id"], // define de qual coluna da tabela retirar o valor
        columnNames: ["specificationId"], // define a coluna a salvar
        onDelete: "SET NULL", // se a informação for excluida a chave recebe o valor de nulo
        onUpdate: "SET NULL", // se a informação for alterar a chave recebe o valor de nulo se for necessário
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> { // função de desfazer
    await queryRunner.dropForeignKey("specificationsCars", "FKSpecificationsCarsSpecificationId"); // exclui a chave estrangeira criada
    await queryRunner.dropForeignKey("specificationsCars", "FKSpecificationsCarsCarId"); // exclui a chave estrangeira criada
    await queryRunner.dropTable("specificationsCars"); // exclui a tabela criada
  }
}
