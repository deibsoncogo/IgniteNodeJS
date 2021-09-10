# imagem a ser utilisada
FROM node

# define o local do conteiner
WORKDIR /usr/app

# copia somente este arquivo para o conteiner
COPY package.json ./

# instala todas as dependências
RUN npm install

# copia os demais arquivos para o conteiner
COPY . .

# define a porta a rodar
EXPOSE 3333

# executa o servidor
CMD ["npm","run","dev"]
