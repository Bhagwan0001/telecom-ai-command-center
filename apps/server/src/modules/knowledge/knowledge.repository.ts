import { KnowledgeArticle } from './knowledge.types';

export class KnowledgeRepository {
  private articles: KnowledgeArticle[] = [
    {
      id: '1',
      title: 'Troubleshooting Tower Node Disconnections',
      category: 'Network Operations',
      content: 'This guide covers typical troubleshooting procedures for tower nodes experiencing unexpected disconnects.',
      tags: ['tower', 'network', 'troubleshooting'],
      createdAt: new Date().toISOString(),
    },
  ];

  async getArticles(): Promise<KnowledgeArticle[]> {
    return this.articles;
  }

  async getArticleById(id: string): Promise<KnowledgeArticle | null> {
    return this.articles.find(art => art.id === id) || null;
  }

  async create(data: Omit<KnowledgeArticle, 'id' | 'createdAt'>): Promise<KnowledgeArticle> {
    const newArt: KnowledgeArticle = {
      ...data,
      id: String(this.articles.length + 1),
      createdAt: new Date().toISOString(),
    };
    this.articles.push(newArt);
    return newArt;
  }
}
