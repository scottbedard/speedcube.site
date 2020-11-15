import { CubeId, DodecaminxId } from '@/types/twister';

/**
 * Cube identifiers
 */
export const cubeIds: CubeId[] = [
  '2x2',
  '3x3',
  '4x4',
  '5x5',
];

/**
 * Determine the size of a cube.
 */
export function cubeSize(id: CubeId): number {
  return parseInt(id, 10);
}

/**
 * Dodecaminx identifiers
 */
export const dodecaminxIds: DodecaminxId[] = [
  'kilominx',
  'megaminx',
  'masterminx',
  'gigaminx',
];

/**
 * Determine the size of a dodecaminx.
 */
export function dodecaminxSize(id: DodecaminxId): number {
  return dodecaminxIds.indexOf(id) + 2;
}

/**
 * Test if puzzle identifier is a cube
 */
export function isCube(str: string): str is CubeId {
  return (cubeIds as string[]).includes(str);
}

/**
 * Test if puzzle identifier is a dodecaminx
 */
export function isDodecaminx(str: string): str is DodecaminxId {
  return (dodecaminxIds as string[]).includes(str);
}
