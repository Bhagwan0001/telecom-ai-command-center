import { Router } from 'express';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsRepository } from './analytics.repository';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

const repository = new AnalyticsRepository();
const service = new AnalyticsService(repository);
const controller = new AnalyticsController(service);

router.get('/', authenticate, controller.getSummary);

export default router;
