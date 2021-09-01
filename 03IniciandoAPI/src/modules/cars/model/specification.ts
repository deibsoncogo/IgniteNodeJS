import { v4 as uuidV4 } from "uuid"; // importa uma função desta dependência

class SpecificationModel { // tipagem para o banco de dados
  id?: string; // ? torna este dado opcional

  name: string; // sem ? define que devemos ter este dado antes de tudo

  description: string; // define o formato do dados a receber

  createdAt: Date;

  constructor() { // serve como uma função para criar algo
    if (!this.id) { // vai identificar se já existe um ID
      this.id = uuidV4(); // cria um ID
    }
  }
}

export { SpecificationModel }; // exporta tudo para ser utilizado em outro local
