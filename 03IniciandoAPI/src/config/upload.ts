import crypto from "crypto"; // dependência nativa utilizada para criar criptografia
import multer from "multer"; // dependência para lidar com upload de arquivos
import { resolve } from "path"; // dependência nativa para lidar com arquivos

function UploadConfig(folder: string) { // função única
  return { // retornar algo ao chamador
    storage: multer.diskStorage({ // chama a função
      destination: resolve(__dirname, "..", "..", folder), // joga o arquivo para a raiz do projeto
      filename: (request, file, callback) => { // chama a função
        const fileHash = crypto.randomBytes(16).toString("hex"); // cria uma chave aleatória
        const fileName = `${fileHash}-${file.originalname}`; // junta a chave com o nome original

        return callback(null, fileName); // retornar algo ao chamador
      },
    }),
  };
}

export { UploadConfig }; // exporta para poder ser utilizado
