import { KnowledgeRepository } from './knowledge.repository';
import { KnowledgeArticle } from './knowledge.types';

export class KnowledgeService {
  constructor(private knowledgeRepository: KnowledgeRepository) {}

  async listArticles(): Promise<KnowledgeArticle[]> {
    return this.knowledgeRepository.getArticles();
  }

  async getArticleById(id: string): Promise<KnowledgeArticle | null> {
    return this.knowledgeRepository.getArticleById(id);
  }

  async createArticle(data: Omit<KnowledgeArticle, 'id' | 'createdAt'>): Promise<KnowledgeArticle> {
    return this.knowledgeRepository.create(data);
  }
}
