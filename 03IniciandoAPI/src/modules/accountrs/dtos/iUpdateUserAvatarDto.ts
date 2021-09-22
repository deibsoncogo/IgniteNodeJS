interface IUpdateUserAvatarDto {
  userId: string;
  avatarFile: string;
}

export { IUpdateUserAvatarDto }; // exporta para poder ser usado

/** Tipagem Data Transfer Object
 * O DTO e quando transformamos os itens recebido pelo request em um objeto
 * E para poder utilizar corretamente com o TypeScript criamos uma tipagem
 * Com a palavra Dto no final e o I no começo para identificar melhor
 * Também fazemos em um arquivo a parte para facilitar sua exportação
 */
