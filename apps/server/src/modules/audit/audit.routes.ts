import { Router } from 'express';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { AuditRepository } from './audit.repository';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

const repository = new AuditRepository();
const service = new AuditService(repository);
const controller = new AuditController(service);

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);

export default router;
export { repository as auditRepository, service as auditService };
