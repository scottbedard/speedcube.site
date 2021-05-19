import { cloneDeep } from 'lodash-es'
import { Cube } from '@bedard/twister'
import { CubeName, PuzzleName } from '@/app/types/puzzle'
import { cubeNames, cubeKeyboardConfig } from '@/components/puzzle/constants'

/**
 * Create a twister model
 */
export function createModel(puzzleName: PuzzleName) {
  if (isCube(puzzleName)) {
    return new Cube({ size: cubeSize(puzzleName) })
  }

  throw `Invalid puzzle: ${puzzleName}`
}

/**
 * Parse the size of a cube
 */
export function cubeSize(cubeName: CubeName) {
  return parseInt(cubeName, 10) // '3x3' => 3, '5x5' => 5, etc...
}

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
