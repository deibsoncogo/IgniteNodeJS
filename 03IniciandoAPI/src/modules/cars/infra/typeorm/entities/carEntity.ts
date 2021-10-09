import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm"; // dependencia para lidar com o banco de dados
import { v4 as uuidV4 } from "uuid"; // dependencia para lidar com ID
import { CategoryEntity } from "./categoryEntity";

@Entity("cars") // vincula a classe com o tabela
class CarEntity { // cria uma classe que iremos usar para o sistema com o DB
  @PrimaryColumn() // define que esta é a coluna principal
  id: string; // define o nome e o tipo de dados da coluna

  @Column() // define como uma coluna normal
  name: string;

  @Column()
  description: string;

  @Column()
  dailyRate: number;

  @Column()
  available: boolean;

  @Column()
  licensePlate: string;

  @Column()
  fineAmount: number;

  @Column()
  brand: string;

  @ManyToOne(() => CategoryEntity) // define o relacionamento das informações de muitos para um
  @JoinColumn({ name: "categoryId" }) // vincula a coluna abaixo com a categoryId
  category: CategoryEntity // cria um coluna para receber todos os dados da categoria

  @Column()
  categoryId: string;

  @CreateDateColumn() // define como uma coluna de registro de criação
  createdAt: Date;

  constructor() { // serve para criar algo quando é chamado pelo comando new
    if (!this.id) { // verifica se já existe um ID criado
      this.id = uuidV4(); // cria um ID
      this.available = true; // cria o campo com este valor
    }
  }
}

export { CarEntity }; // exporta para poder ser chamado
