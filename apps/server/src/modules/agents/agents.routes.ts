import { Router } from 'express';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { AgentsRepository } from './agents.repository';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

const repository = new AgentsRepository();
const service = new AgentsService(repository);
const controller = new AgentsController(service);

router.get('/', authenticate, controller.getAll);

export default router;
