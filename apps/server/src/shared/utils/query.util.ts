import { Request } from 'express';

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ParsedQueryOptions {
  page: number;
  limit: number;
  skip: number;
  take: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
  search?: string;
  filters: Record<string, any>;
}

/**
 * Parsed query parameters from the request
 */
export function parseQueryParams(req: Request, defaultSortField = 'createdAt'): ParsedQueryOptions {
  const page = Math.max(1, parseInt(req.query.page as string || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string || '10', 10)));
  const skip = (page - 1) * limit;

  // Sorting
  const sortBy = (req.query.sortBy as string) || defaultSortField;
  const sortOrder = (req.query.sortOrder as string) === 'asc' ? 'asc' : 'desc';
  const orderBy = { [sortBy]: sortOrder } as Record<string, 'asc' | 'desc'>;

  // Search
  const search = (req.query.search as string) || undefined;

  // Filters (extract everything that isn't pagination or sorting)
  const excludeParams = ['page', 'limit', 'sortBy', 'sortOrder', 'search'];
  const filters: Record<string, any> = {};

  Object.keys(req.query).forEach((key) => {
    if (!excludeParams.includes(key)) {
      const val = req.query[key];
      // Basic type coercion: handle booleans and numbers
      if (val === 'true') {
        filters[key] = true;
      } else if (val === 'false') {
        filters[key] = false;
      } else if (!isNaN(Number(val)) && val !== '') {
        filters[key] = Number(val);
      } else {
        filters[key] = val;
      }
    }
  });

  return {
    page,
    limit,
    skip,
    take: limit,
    orderBy,
    search,
    filters,
  };
}

/**
 * Formats data and total count into standard PaginatedResult format
 */
export function toPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}
