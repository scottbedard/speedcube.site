import { PuzzleName } from './puzzle'

/**
 * Raw keyboard config
 */
export type RawKeyboardConfig = {
  config: string
  puzzle: PuzzleName
}

/**
 * Keyboard config
 */
export type KeyboardConfig = {
  config: Record<string, string>
  puzzle: PuzzleName
}

/**
 * Raw puzzle config
 */
export type RawPuzzleConfig = {
  config: string
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
