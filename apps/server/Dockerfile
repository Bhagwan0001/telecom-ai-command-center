FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/server/package.json ./apps/server/
COPY packages ./packages
COPY apps/server ./apps/server

RUN npm install

RUN npx prisma generate --schema=apps/server/prisma/schema.prisma

RUN npm run build -w apps/server

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/prisma ./prisma
COPY --from=builder /app/apps/server/package.json ./package.json

EXPOSE 4000

CMD ["node", "dist/index.js"]