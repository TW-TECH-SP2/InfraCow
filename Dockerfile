# Etapa 1: Build do Front-end
  FROM node:20 AS build

# Define o diretório de trabalho dentro do container
  WORKDIR /app

# Copia apenas os arquivos de dependências primeiro para aproveitar cache
  COPY front-end/package*.json ./

# Instala as dependências
  RUN npm install

# Copia todo o código fonte para dentro do container
  COPY front-end/ .

# Roda o build do Vite
  RUN npm run build

# Etapa 2: Servir com Nginx
  FROM nginx:alpine

# Remove conteúdo default do Nginx e copia o build
  RUN rm -rf /usr/share/nginx/html/*
  COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 8080
  EXPOSE 8080

# Comando para manter o Nginx rodando
  ENTRYPOINT ["nginx", "-g", "daemon off;"]
