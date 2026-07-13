import { Router, Request, Response, NextFunction } from 'express';
import { supervisorService } from '../ai/orchestrator/Supervisor';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

// Protect all AI routes
router.use(authenticate);

// Only specific roles can execute arbitrary AI queries via the Orchestrator
router.post(
  '/query',
  authorize('admin', 'network_engineer', 'manager', 'executive'),
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { query, context } = req.body;

      if (!query) {
        return res.status(400).json({
          status: 'error',
          message: 'Query is required.',
        });
      }

      const result = await supervisorService.handleRequest(query, context);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
