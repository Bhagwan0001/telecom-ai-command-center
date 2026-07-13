import { Router } from 'express';
import { NetworkController } from './network.controller';
import { NetworkService } from './network.service';
import { NetworkRepository } from './network.repository';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

const repository = new NetworkRepository();
const service = new NetworkService(repository);
const controller = new NetworkController(service);

router.get('/topology', authenticate, controller.getTopology);
router.get('/metrics', authenticate, controller.getMetrics);
router.get('/incidents', authenticate, controller.getIncidents);

export default router;
