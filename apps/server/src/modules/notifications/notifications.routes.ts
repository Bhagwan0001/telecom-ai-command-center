import { Router } from 'express';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsRepository } from './notifications.repository';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

const repository = new NotificationsRepository();
const service = new NotificationsService(repository);
const controller = new NotificationsController(service);

router.get('/', authenticate, controller.getAll);
router.put('/:id/read', authenticate, controller.markAsRead);

export default router;
