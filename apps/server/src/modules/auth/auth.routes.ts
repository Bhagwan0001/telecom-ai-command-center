import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { userRepository, userService } from '../users/users.routes';
import { auditService } from '../audit/audit.routes';
import { validate } from '../../middlewares/validation.middleware';
import { loginSchema, registerSchema, refreshTokenSchema } from './auth.validation';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

const repository = new AuthRepository();
const service = new AuthService(repository, userRepository, userService);
const controller = new AuthController(service, auditService);

router.post('/register', validate({ body: registerSchema }), controller.register);
router.post('/login', validate({ body: loginSchema }), controller.login);
router.post('/refresh', validate({ body: refreshTokenSchema }), controller.refresh);
router.post('/logout', authenticate, validate({ body: refreshTokenSchema }), controller.logout);
router.get('/me', authenticate, controller.getMe);

export default router;
