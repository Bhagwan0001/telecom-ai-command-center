import { Request, Response, NextFunction } from 'express';
import { AiService } from './ai.service';
import { formatSuccessResponse } from '../../utils/response';

export class AiController {
  constructor(private aiService: AiService) {}

  public chat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { message } = req.body;
      if (!message) {
        res.status(400).json({ error: 'Message is required' });
        return;
      }
      
      const response = await this.aiService.chat(message);
      res.status(200).json({
        success: true,
        ...response
      });
    } catch (error) {
      next(error);
    }
  };
}
