import csvParse from "csv-parse"; // dependencia que lida com arquivo csv
import fs from "fs"; // dependencia nativa para lidar com arquivos

class ImportCategoryService { // grupo único e principal
  execute(file: Express.Multer.File) { // função única e principal
    const stream = fs.createReadStream(file.path); // serve para receber os dados dentro do arquivo em partes

    const parseFile = csvParse({ // definição para como o arquivo devera ser lido
      delimiter: ";", // define qual é o separador dos dados
    });

    stream.pipe(parseFile); // pipe serve para realizar a leitura do stream e dar a tratativa do CVS Parse

    // on vai nos permitir realizar uma tratativa nos dados por linha
    parseFile.on("data", async (line) => {
      console.log(line);
    });

    return file; // retorna algo ao chamador
  }
}

export { ImportCategoryService }; // exporta para poder ser chamado
