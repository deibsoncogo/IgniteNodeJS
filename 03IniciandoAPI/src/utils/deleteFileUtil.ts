import fs from "fs"; // dependência nativa para lidar com arquivos

async function DeleteFileUtil(fileName: string) { // função única
  try { // serve para captar erros
    await fs.promises.stat(fileName); // identifica se o arquivo existe
  } catch { // quando captar um erro executar isso
    return; // retorna algo ao chamador
  }

  await fs.promises.unlink(fileName); // exclui o arquivo existente
}

export { DeleteFileUtil }; // exporta para poder ser chamado
