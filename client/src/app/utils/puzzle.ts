import { CubeName } from '@/app/types/puzzle'
import { cubeNames } from '@/components/puzzle/constants'

/**
 * Test if puzzle identifier is a cube
 */
export function isCube(str: string): str is CubeName {
  return (cubeNames as string[]).includes(str);
}
