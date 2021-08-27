interface ICourse { // criação de uma tipagem
  name: string;
  duration: number;
  educator: string;
}

class CreateCourseService { // criação de um "grupo" para escrever os comandos
  execute({ name, duration, educator }: ICourse) { // criação de um método
    console.log(name, duration, educator);
  }
}

// exporta todo conteúdo já estanciado
export default new CreateCourseService();
