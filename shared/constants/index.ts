// ============================================
// Application Constants
// ============================================

export const APP_NAME = 'Nuxt App'

// ============================================
// Pagination
// ============================================

export const DEFAULT_PAGE = 1
export const DEFAULT_PER_PAGE = 10
export const MAX_PER_PAGE = 100

// ============================================
// User Roles
// ============================================

export const USER_ROLES = ['admin', 'user', 'guest'] as const

// ============================================
// HTTP Status Codes
// ============================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const

// ============================================
// Date Formats
// ============================================

export const DATE_FORMAT = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  WITH_TIME: 'dd/MM/yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const
