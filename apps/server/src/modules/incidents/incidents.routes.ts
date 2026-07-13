import { Router } from 'express';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { IncidentsRepository } from './incidents.repository';
import { authenticate } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { createIncidentSchema } from './incidents.validation';

const router = Router();

const repository = new IncidentsRepository();
const service = new IncidentsService(repository);
const controller = new IncidentsController(service);

router.get('/', authenticate, controller.getIncidents);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, validate({ body: createIncidentSchema }), controller.create);

export default router;
