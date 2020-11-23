/**
 * Cube configuration
 */
export interface CubeConfig {
  /**
   * Colors
   *
   * U, L, F, R, B, D
   */
  colors: [string, string, string, string, string, string],

  /**
   * Inner brightness
   *
   * 0 = transparent
   * 1 = opaque
   */
  innerBrightness: number, // 0 = invisible, 1 = full brightness

  /**
   * Sticker elevation
   *
   * 0 = no elevation
   * 1 = layer width elevation
   */
  stickerElevation: number,

  /**
   * Sticker radius
   *
   * 0 = no radius
   * 1 = half the distance to nearest corner
   */
  stickerRadius: number,

  /**
   * Sticker spacing
   *
   * 0 = no spacing
   * 1 = layer width spacing
   */
  stickerSpacing: number, // 0 = no spacing, 1 = sticker dist spacing
}

/**
 * Cube identifiers
 */
export type CubeId =
  | '2x2'
  | '3x3'
  | '4x4'
  | '5x5';

/**
 * Dodecaminx config
 */
export interface DodecaminxConfig {
  /**
   * Inner brightness
   *
   * 0 = transparent
   * 1 = opaque
   */
  innerBrightness: number,

  /**
   * Size of middle segment for odd-layered puzzles
   *
   * 0 = adjacent corner matrices
   * 1 = corner matrices one layer length apart
   */
  middleSize: number,

  /**
   * Sticker elevation
   *
   * 0 = dodecahedron circumradius of 1 (no elevation)
   * 1 = dodecahedron circumradius of 2
   */
  stickerElevation: number,

  /**
   * Sticker radius
   *
   * 0 = no radius
   * 1 = half the distance to nearest corner
   */
  stickerRadius: number,

  /**
   * Size of gap between adjacent stickers
   *
   * 0 = no spacing
   * 1 = matrix layer size spacing
   */
  stickerSpacing: number,
}

/**
 * Dodecaminx identifiers
 */
export type DodecaminxId = 
  | 'kilominx'
  | 'megaminx'
  | 'masterminx'
  | 'gigaminx';
