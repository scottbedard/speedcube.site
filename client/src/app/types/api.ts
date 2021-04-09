import { AxiosResponse } from 'axios'
import { User } from './models'

/**
 * Axios error responses
 */
export type AxiosErrorResponse<T = any> = {
  response: AxiosResponse<T>
}

/**
 * Validation error
 */
export type AxiosValidationErrorResponse = AxiosErrorResponse<{
  errors: Record<string, string[]>
  message: string
}>

/**
 * POST: /api/users
 */
export type CreateUserResponse = {
  user: User
}

/**
 * POST: /api/auth/login
 */
export type LoginResponse = {
  user: User
}

