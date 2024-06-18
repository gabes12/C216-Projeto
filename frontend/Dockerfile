# Use a imagem oficial do Node.js como base
FROM node:14

# Crie um diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta em que sua aplicação estará ouvindo
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "app.js"]
