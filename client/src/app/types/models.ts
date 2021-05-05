import { KeyboardConfig as KeyboardConfigObj, PuzzleName } from './puzzle'

/**
 * Keyboard config
 */
 export type KeyboardConfig = {
  config: KeyboardConfigObj
  puzzle: PuzzleName
}

/**
 * Puzzle config
 */
export type PuzzleConfig = {
  config: Record<string, unknown>
  puzzle: PuzzleName
}

/**
 * User
 */
export type User = {
  allowComments: boolean
  createdAt: string
  email: string
  emailVerifiedAt: null | string
  id: number
  publicSolves: boolean
  publicStats: boolean
  updatedAt: string
  username: string
}
