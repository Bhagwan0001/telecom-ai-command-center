import { prisma } from '../../prisma/client';
import { AuditLog, Prisma, AuditAction } from '@prisma/client';
import { CreateAuditLogInput } from './audit.types';

export class AuditRepository {
  async create(data: CreateAuditLogInput): Promise<AuditLog> {
    return prisma.auditLog.create({
      data: {
        userId: data.userId || null,
        action: data.action as unknown as AuditAction,
        resource: data.resource,
        metadata: data.details || Prisma.JsonNull,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
      },
    });
  }

  async findMany(where?: Prisma.AuditLogWhereInput, limit = 100): Promise<AuditLog[]> {
    return prisma.auditLog.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<AuditLog | null> {
    return prisma.auditLog.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
          },
        },
      },
    });
  }
}
