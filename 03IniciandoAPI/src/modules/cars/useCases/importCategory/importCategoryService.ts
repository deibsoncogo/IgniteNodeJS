import csvParse from "csv-parse"; // dependencia que lida com arquivo csv
import fs from "fs"; // dependencia nativa para lidar com arquivos
import { inject, injectable } from "tsyringe"; // dependência que realiza injeção dos arquivos
import { CategoryEntity } from "../../model/categoryEntity";
import { ICategoryRepository } from "../../repositories/iCategoryRepository";

interface IImportCategory { // tipagem dos dados dentro do arquivo
  name: string;
  description: string;
}

@injectable() // para permite a injeção do TSyringe nesta classe
class ImportCategoryService { // grupo único e principal
  constructor( // criar o acesso ao repositório de categoria
    @inject("CategoryRepository") // realiza a injeção do TSyringe
    private categoryRepository: ICategoryRepository, // criar o acesso ao repositório
  ) {}

  // função secundária que vai dar todas tratativas do arquivo
  loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => { // cria uma promise
      const stream = fs.createReadStream(file.path); // serve para receber os dados dentro do arquivo em partes
      const categoriesLoadCategoryImport: IImportCategory[] = []; // variavel para salvar os dados recebido temporariamente

      const parseFile = csvParse({ // definição para como o arquivo devera ser lido
        delimiter: ";", // define qual é o separador dos dados
      });

      stream.pipe(parseFile); // pipe serve para realizar a leitura do stream e dar a tratativa do CVS Parse

      // on vai nos permitir realizar uma tratativa nos dados por linha
      parseFile.on("data", async (line) => {
        const [name, description] = line; // recebe os dados desestruturado

        categoriesLoadCategoryImport.push({ name, description }); // salva na variavel
      }).on("end", () => { // vai executar algo quando tudo finalizar
        fs.promises.unlink(file.path); // vai excluir o arquivo recebido
        resolve(categoriesLoadCategoryImport); // retorna algo ao chamador sem erro
      }).on("error", (err) => { // vai executar algo se acontecer um erro
        fs.promises.unlink(file.path); // vai excluir o arquivo recebido
        reject(err); // retorna um erro ao chamador
      });
    });
  }

  // função principal que vai gerenciar todo o service
  async execute(file: Express.Multer.File): Promise<CategoryEntity[] | undefined> {
    console.log("Service - Inicio");

    const categoriesExecuteImport = await this.loadCategory(file); // chama a função

    const categorySaved: CategoryEntity[] = []; // para retornar oque foi salvo

    // para lidar com os dados para assim conseguir salvar individualmente
    categoriesExecuteImport.map(async (category) => {
      console.log("Service - Map inicio");
      const { name, description } = category; // recebe os dados desestruturado

      const categoryAlreadyExists = await this.categoryRepository.findByName(name); // chama a função

      if (!categoryAlreadyExists) { // identifica se ja existe alguma categoria com este nome
        const categorySavedAn = await this.categoryRepository.create({ name, description }); // chama a função

        console.log("Antes do push", categorySavedAn);

        categorySaved.push(categorySavedAn); // salva a categoria criada para poder retornar algo ao chamador

        console.log("Depois do push", categorySaved);
      }
      console.log("Service - Map final");
    });

    console.log("Service - Final", categorySaved);

    return categorySaved; // retorna algo ao chamador
  }
}

export { ImportCategoryService }; // exporta para poder ser chamado
