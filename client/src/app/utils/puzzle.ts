import { cloneDeep } from 'lodash-es'
import { CubeName, PuzzleName } from '@/app/types/puzzle'
import { cubeNames, cubeKeyboardConfig } from '@/components/puzzle/constants'

/**
 * Default keyboard configuration for a puzzle
 */
export function defaultKeyboardConfig(rawPuzzleName: string) {
  try {
    const puzzle = normalizePuzzleName(rawPuzzleName)

    if (isCube(puzzle)) {
      return cloneDeep(cubeKeyboardConfig)
    }
  } catch {
    // ...
  }

  return {}
}

/**
 * Test if puzzle identifier is a cube
 */
export function isCube(str: string): str is CubeName {
  return (cubeNames as string[]).includes(str);
}

/**
 * Convert raw string to a puzzle name
 */
export function normalizePuzzleName(str: string): PuzzleName {
  const normalizedStr = str.trim().toLowerCase()

  if (isCube(normalizedStr)) {
    return normalizedStr
  }

  throw `Invalid puzzle: ${str}`
}
