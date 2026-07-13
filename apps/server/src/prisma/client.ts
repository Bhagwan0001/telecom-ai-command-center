import { PrismaClient } from '@prisma/client';
import { logger } from '@taicc/logger';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Prevent multiple instances of Prisma Client in development during hot-reloads
  const globalWithPrisma = global as typeof globalThis & {
    prisma?: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = globalWithPrisma.prisma;
}

prisma.$connect()
  .then(() => {
    logger.info('🐘 PostgreSQL database connected via Prisma');
  })
  .catch((err) => {
    logger.error('❌ PostgreSQL database connection error:', err);
  });

export { prisma };
