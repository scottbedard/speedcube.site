import { AxiosResponse } from 'axios'
import { RawKeyboardConfig, RawPuzzleConfig } from '@/app/types/models'
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
 * POST: /api/users/forgot-password
 */
export type ForgotPasswordResponse = {
  success: boolean
}

/**
 * POST: /api/auth/login
 */
export type LoginResponse = {
  keyboardConfigs: RawKeyboardConfig[]
  puzzleConfigs: RawPuzzleConfig[]
  user: User
}

/**
 * Server response codes
 */
 export enum StatusCodes {
  Success = 200,
  Unauthorized = 401,
  UnprocessableEntity = 422,
}

/**
 * POST: /api/keyboard-configs
 */
export type UpdateKeyboardConfigResponse = {
  keyboardConfigs: RawKeyboardConfig[],
}

/**
 * POST: /api/puzzle-configs
 */
export type UpdatePuzzleConfigResponse = {
  puzzleConfigs: RawPuzzleConfig[]
}

/**
 * POST: /api/users/{id}
 */
export type UpdateUserResponse = {
  user: User
}
