import { Router } from 'express';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { DashboardRepository } from '../dashboard/dashboard.repository';

const router = Router();

const dashboardRepository = new DashboardRepository();
const service = new AiService(dashboardRepository);
const controller = new AiController(service);

router.post('/chat', controller.chat);

export default router;
