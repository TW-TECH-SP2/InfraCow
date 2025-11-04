# Etapa 1 — Build
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Porta exposta pelo backend
EXPOSE 4000

# Comando final: cria DB + aplica migrations + inicia o servidor
CMD ["sh", "-c", "npx sequelize-cli db:create && npx sequelize-cli db:migrate && npm start"]
