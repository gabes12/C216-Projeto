FROM node:16

# Cria o diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta em que a aplicação irá rodar
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
