import { Request, Response, NextFunction } from 'express';
import { KnowledgeService } from './knowledge.service';
import { formatSuccessResponse } from '../../utils/response';

export class KnowledgeController {
  constructor(private knowledgeService: KnowledgeService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articles = await this.knowledgeService.listArticles();
      res.status(200).json(formatSuccessResponse(articles, 'Knowledge articles retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const article = await this.knowledgeService.getArticleById(req.params.id);
      res.status(200).json(formatSuccessResponse(article, 'Knowledge article details retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const article = await this.knowledgeService.createArticle(req.body);
      res.status(201).json(formatSuccessResponse(article, 'Knowledge article created successfully'));
    } catch (error) {
      next(error);
    }
  };
}
