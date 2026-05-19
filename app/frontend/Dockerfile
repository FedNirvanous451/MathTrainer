FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# Копируем ВСЁ, включая src/api
COPY . .

# Явная проверка, что client.ts на месте (если нет – ошибка сборки)
RUN test -f src/api/client.ts || (echo "client.ts NOT FOUND" && exit 1)

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80