import { Router } from 'express';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './customers.repository';
import { authenticate } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { createCustomerSchema } from './customers.validation';

const router = Router();

const repository = new CustomersRepository();
const service = new CustomersService(repository);
const controller = new CustomersController(service);

router.get('/', authenticate, controller.getAll);
router.get('/:id', authenticate, controller.getById);
router.post('/', authenticate, validate({ body: createCustomerSchema }), controller.create);

export default router;
