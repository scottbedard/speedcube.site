import { CubeName, PuzzleName } from '@/app/types/puzzle'
import { cubeNames } from '@/components/puzzle/constants'

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
  const normalizedStr = str.trim().toLowerCase();

  if (isCube(normalizedStr)) {
    return normalizedStr;
  }

  throw `Invalid puzzle: ${str}`;
}
