import { colors } from '@/app/utils/color';

import {
  CubeConfig,
  CubeName,
  DodecaminxConfig,
  DodecaminxName,
  PuzzleName,
} from '@/types/puzzle';

/**
 * Default cube configuration.
 */
export const cubeConfig: CubeConfig = {
  cameraAngle: 50,
  cameraDistance: 3,
  colors: [
      colors.yellow, // U
      colors.orange, // L
      colors.blue, // F
      colors.red, // R
      colors.green, // B
      colors.white, // D
  ],
  innerBrightness: 0.9,
  stickerElevation: 0.2,
  stickerRadius: 0.2,
  stickerSpacing: 0.2,
  turnDuration: 65,
};

/**
 * Cube identifiers
 */
export const cubeNames: CubeName[] = [
  '2x2',
  '3x3',
  '4x4',
  '5x5',
];

/**
 * Determine the size of a cube.
 */
export function cubeSize(name: CubeName): number {
  return parseInt(name, 10);
}

/**
 * Default dodecaminx configuration.
 */
export const dodecaminxConfig: DodecaminxConfig = {
  cameraAngle: 45,
  cameraDistance: 3,
  colors: [
    colors.gray, // B
    colors.orange, // BL
    colors.lightGreen, // BR
    colors.creme, // D
    colors.lightBlue, // DBL
    colors.pink, // DBR
    colors.green, // DL
    colors.red, // DR
    colors.white, // F
    colors.purple, // L
    colors.blue, // R
    colors.yellow, // U
  ],
  innerBrightness: 0.9,
  middleSize: 0,
  stickerElevation: 0.05,
  stickerRadius: 0.1,
  stickerSpacing: 0.1,
  turnDuration: 100,
};

/**
 * Dodecaminx identifiers
 */
export const dodecaminxNames: DodecaminxName[] = [
  'kilominx',
  'megaminx',
  'masterminx',
  'gigaminx',
];

/**
 * Determine the size of a dodecaminx.
 */
export function dodecaminxSize(name: DodecaminxName): number {
  return dodecaminxNames.indexOf(name) + 2;
}

/**
 * Get puzzle ID by name. Returns -1 if puzzle name is not valid.
 */
export function getPuzzleId(name: string) {
  return puzzleIds[name.trim().toLowerCase() as PuzzleName] || -1;
}

/**
 * Test if puzzle identifier is a cube
 */
export function isCube(str: string): str is CubeName {
  return (cubeNames as string[]).includes(str);
}

/**
 * Test if puzzle identifier is a dodecaminx
 */
export function isDodecaminx(str: string): str is DodecaminxName {
  return (dodecaminxNames as string[]).includes(str);
}

/**
 * Test if string is a puzzle name
 */
export function isPuzzle(str: string): str is PuzzleName {
  return isCube(str) || isDodecaminx(str);
}

/**
 * Puzzle ids are stored in the database as integers. This
 * constant maps those ids to their cooresponding names.
 * 
 * 0 is reserved as an unknown puzzle id, and is only used
 * for testing purposes.
 */
export const puzzleIds: Record<PuzzleName, number> = {
  '2x2': 1,
  '3x3': 2,
  '4x4': 3,
  '5x5': 4,
  'kilominx': 5,
  'megaminx': 6,
  'masterminx': 7,
  'gigaminx': 8,
};
