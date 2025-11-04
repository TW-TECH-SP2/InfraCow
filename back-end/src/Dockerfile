# Etapa 1 — Build
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Define variáveis padrão (Render pode sobrescrever com .env)
ENV DB_DIALECT=postgres
ENV DB_PORT=5432
ENV NODE_ENV=production

# Porta exposta
EXPOSE 4000

# Comando final — testa conexão e inicia servidor
CMD ["npm", "start"]