// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiErrorResponse {
  success: false
  error: string
  statusCode: number
  details?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  meta: PaginationMeta
}

export interface PaginationMeta {
  page: number
  perPage: number
  total: number
  totalPages: number
}

// ============================================
// User Types
// ============================================

export type UserRole = 'admin' | 'user' | 'guest'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type CreateUserDto = Pick<User, 'name' | 'email' | 'role'>
export type UpdateUserDto = Partial<CreateUserDto>

// ============================================
// Common Types
// ============================================

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  field: string
  direction: SortDirection
}

export interface PaginationParams {
  page?: number
  perPage?: number
  sort?: string
  order?: SortDirection
}
