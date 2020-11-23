import {
  CubeConfig,
  CubeId,
  DodecaminxConfig,
  DodecaminxId,
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
};

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
};

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
