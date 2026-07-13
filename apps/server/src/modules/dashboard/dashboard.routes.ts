import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardRepository } from './dashboard.repository';


const router = Router();

const repository = new DashboardRepository();
const service = new DashboardService(repository);
const controller = new DashboardController(service);

router.get('/overview', controller.getOverview);
router.get('/network-health', controller.getNetworkHealth);
router.get('/incidents', controller.getIncidents);
router.get('/analytics', controller.getAnalytics);

export default router;
