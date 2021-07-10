import { AxiosResponse } from 'axios'
import { PuzzleName } from './puzzle'
import { RawKeyboardConfig, RawPuzzleConfig } from '@/app/types/models'
import { Solve, User } from './models'

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
 * Server response codes
 */
 export enum StatusCodes {
  Success = 200,
  Unauthorized = 401,
  UnprocessableEntity = 422,
}

/**
 * POST: /api/solves/abort
 */
export type AbortSolvePayload = {
  solution: string,
  solveId: number,
}

/**
 * POST: /api/solves/complete
 */
export type CompleteSolvePayload = {
  solution: string,
  solveId: number,
}

/**
 * POST: /api/solves
 */
export type CreateSolvePayload = {
  puzzle: PuzzleName,
}

/**
 * POST: /api/solves
 */
export type CreateSolveResponse = {
  solveId: number,
  state: Record<string, unknown>,
}

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
