export interface CreateAuditLogInput {
  userId?: string | null;
  action: string;
  resource: string;
  details?: any;
  ipAddress?: string | null;
  userAgent?: string | null;
}
