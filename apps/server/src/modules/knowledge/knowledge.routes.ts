import { Router } from 'express';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeRepository } from './knowledge.repository';
import { authenticate } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { createArticleSchema } from './knowledge.validation';

const router = Router();

const repository = new KnowledgeRepository();
const service = new KnowledgeService(repository);
const controller = new KnowledgeController(service);

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, validate({ body: createArticleSchema }), controller.create);

export default router;
