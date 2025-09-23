# Base stage для общих зависимостей
FROM node:20-alpine AS base

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

# Development stage
FROM base AS development

# Устанавливаем все зависимости (включая devDependencies)
RUN npm ci

# Копируем исходный код
COPY src/ ./src/
COPY nodemon.json ./

# Открываем порт для приложения и отладки
EXPOSE 5000 9229

# Команда для development
CMD ["npm", "run", "dev"]

# Build stage для production
FROM base AS builder

# Устанавливаем зависимости (включая dev для сборки)
RUN npm ci

# Копируем исходный код
COPY src/ ./src/

# Собираем TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production --ignore-scripts

# Копируем собранные файлы из builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/postgres/migrations ./dist/postgres/migrations
COPY --from=builder /app/src/postgres/seeds ./dist/postgres/seeds

# Копируем .env если существует
COPY .env ./

# Создаем non-root пользователя
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 && \
    chown -R appuser:nodejs /app

# Переключаемся на non-root пользователя
USER appuser

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/app.js"]