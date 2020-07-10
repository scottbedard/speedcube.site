/**
 * Returns the size of a cube.
 *
 * '2x2' => 2
 * '3x3' => 3
 * etc...
 */
export function getCubeSize(type: string): number {
  return parseInt(type, 10);
}

/**
 * Test if a puzzle is a cube.
 *
 * '3x3' => true
 * '5x5' => true
 * 'megaminx' => false
 */
export function isCube(type: string): boolean {
  return /^(\d+)x\1$/.test(type);
}
