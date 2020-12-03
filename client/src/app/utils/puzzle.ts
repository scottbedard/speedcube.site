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
  cameraAngle: 45,
  cameraDistance: 3,
  colors: ['#f00', '#0f0', '#00f', '#f0f', '#ff0', '#0ff'],
  innerBrightness: 0.9,
  stickerElevation: 0.25,
  stickerRadius: 0.25,
  stickerSpacing: 0.25,
  turnDuration: 100,
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
    '#F6E05E', // u: yellow
    '#F7FAFC', // f: white
    '#9F7AEA', // l: purple
    '#ED8936', // bl: orange
    '#9AE6B4', // br: light green
    '#2B6CB0', // r: dark blue
    '#FBD38D', // d: creme
    '#718096', // b: gray
    '#90CDF4', // dbl: light blue
    '#2F855A', // dl: dark green
    '#E53E3E', // dr: red
    '#F687B3', // dbr: pink
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
 */
export const puzzleIds: Record<PuzzleName, number> = {
  '2x2': 0,
  '3x3': 1,
  '4x4': 2,
  '5x5': 3,
  'kilominx': 4,
  'megaminx': 5,
  'masterminx': 6,
  'gigaminx': 7,
};
