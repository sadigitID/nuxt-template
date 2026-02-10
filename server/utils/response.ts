import type { H3Event } from 'h3'

/**
 * Parse pagination parameters from query string.
 */
export function parsePaginationParams(event: H3Event) {
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const perPage = Math.min(100, Math.max(1, Number(query.perPage) || 10))
  const sort = typeof query.sort === 'string' ? query.sort : undefined
  const order = query.order === 'desc' ? 'desc' : 'asc'

  return { page, perPage, sort, order } as const
}

/**
 * Create a standardized API success response.
 */
export function createApiResponse<T>(data: T, message?: string) {
  return {
    success: true as const,
    data,
    ...(message ? { message } : {}),
  }
}

/**
 * Create a standardized paginated API response.
 */
export function createPaginatedResponse<T>(
  data: T[],
  meta: { page: number; perPage: number; total: number }
) {
  return {
    success: true as const,
    data,
    meta: {
      ...meta,
      totalPages: Math.ceil(meta.total / meta.perPage),
    },
  }
}
