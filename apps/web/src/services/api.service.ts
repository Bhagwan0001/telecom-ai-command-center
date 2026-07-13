import { apiClient } from '@/lib/axios';
import type { ApiResponse } from '@taicc/types';

/**
 * Base API service class.
 * All feature services should extend this for consistent
 * request/response handling.
 */
export class ApiService {
  protected basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  protected async get<T>(path: string = ''): Promise<ApiResponse<T>> {
    const response = await apiClient.get(`${this.basePath}${path}`);
    return response.data;
  }

  protected async post<T>(path: string = '', data?: unknown): Promise<ApiResponse<T>> {
    const response = await apiClient.post(`${this.basePath}${path}`, data);
    return response.data;
  }

  protected async put<T>(path: string = '', data?: unknown): Promise<ApiResponse<T>> {
    const response = await apiClient.put(`${this.basePath}${path}`, data);
    return response.data;
  }

  protected async delete<T>(path: string = ''): Promise<ApiResponse<T>> {
    const response = await apiClient.delete(`${this.basePath}${path}`);
    return response.data;
  }
}
