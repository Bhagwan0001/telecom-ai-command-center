import { AuditRepository } from './audit.repository';
import { AuditLog } from '@prisma/client';
import { CreateAuditLogInput } from './audit.types';

export class AuditService {
  constructor(private auditRepository: AuditRepository) {}

  async log(data: CreateAuditLogInput): Promise<AuditLog> {
    return this.auditRepository.create(data);
  }

  async getLogs(userId?: string): Promise<AuditLog[]> {
    return this.auditRepository.findMany(userId ? { userId } : undefined);
  }

  async getLogById(id: string): Promise<AuditLog | null> {
    return this.auditRepository.findById(id);
  }
}
