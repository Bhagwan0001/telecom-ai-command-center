import { Router } from 'express';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './users.repository';
import { auditService } from '../audit/audit.routes';
import { authenticate } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { createUserSchema, updateUserSchema } from './users.validation';

const router = Router();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service, auditService);

router.get('/me', authenticate, controller.getMe);
router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, validate({ body: createUserSchema }), controller.create);
router.put('/:id', authenticate, validate({ body: updateUserSchema }), controller.update);
router.delete('/:id', authenticate, controller.delete);

export default router;
export { repository as userRepository, service as userService };
