import { Router, Request, Response } from 'express';
import { formatSuccessResponse } from '../utils/response';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json(
    formatSuccessResponse(
      {
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        env: process.env.NODE_ENV,
      },
      'Health check passed successfully'
    )
  );
});

export default router;
