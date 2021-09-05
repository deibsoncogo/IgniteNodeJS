import csvParse from "csv-parse"; // dependencia que lida com arquivo csv
import fs from "fs"; // dependencia nativa para lidar com arquivos
import { CategoryModel } from "../../model/categoryModel";
import { ICategoryRepository } from "../../repositories/iCategoryRepository";

interface IImportCategory { // tipagem dos dados dentro do arquivo
  name: string;
  description: string;
}

class ImportCategoryService { // grupo único e principal
  constructor(private categoryRepository: ICategoryRepository) {} // criar o acesso ao repositório de categoria

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
  async execute(file: Express.Multer.File): Promise<CategoryModel[] | undefined> {
    const categoriesExecuteImport = await this.loadCategory(file); // chama a função

    const categorySaved: CategoryModel[] = []; // para retornar oque foi salvo

    // para lidar os dados para assim conseguir salvar individualmente
    categoriesExecuteImport.map(async (category) => {
      const { name, description } = category; // recebe os dados desestruturado

      const categoryAlreadyExists = this.categoryRepository.findByName(name); // chama a função

      if (!categoryAlreadyExists) { // identifica se ja existe alguma categoria com este nome
        categorySaved.push(this.categoryRepository.create({ name, description })); // chama a função
      }
    });

    return categorySaved; // retorna algo ao chamador
  }
}

export { ImportCategoryService }; // exporta para poder ser chamado
