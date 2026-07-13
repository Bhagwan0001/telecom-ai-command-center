FROM node:20-alpine AS builder

WORKDIR /app

# Copy root configurations and dependency files for all workspace modules used by the backend
COPY package*.json ./
COPY apps/server/package.json ./apps/server/
COPY packages/logger/package.json ./packages/logger/
COPY packages/shared/package.json ./packages/shared/
COPY packages/types/package.json ./packages/types/
COPY packages/config/package.json ./packages/config/

# Install all workspace dependencies
RUN npm install

# Copy source files for shared packages and backend app
COPY packages ./packages
COPY apps/server ./apps/server

# Build shared packages in dependency order
RUN npm run build -w packages/types && \
    npm run build -w packages/shared && \
    npm run build -w packages/logger

# Generate Prisma Client
RUN npx prisma generate --schema=apps/server/prisma/schema.prisma

# Build the backend server
RUN npm run build -w apps/server

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules and built workspaces to preserve workspace linking
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/prisma ./prisma
COPY --from=builder /app/apps/server/package.json ./package.json

EXPOSE 4000

CMD ["node", "dist/index.js"]