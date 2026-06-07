FROM node:22.13-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm@9

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
