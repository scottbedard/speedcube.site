/**
 * Cube configuration
 */
export type CubeConfig = PuzzleConfig & {
  /**
   * Colors
   *
   * U, L, F, R, B, D
   */
  colors: string[],

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
export type CubeName =
  | '2x2'
  | '3x3'
  | '4x4'
  | '5x5';

/**
 * Dodecaminx config
 */
export type DodecaminxConfig = PuzzleConfig & {
  /**
   * Colors
   *
   * @todo: document face order
   */
  colors: string[],

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
export type DodecaminxName = 
  | 'kilominx'
  | 'megaminx'
  | 'masterminx'
  | 'gigaminx';

/**
 * Puzzle config
 */
export type PuzzleConfig = {
  /**
   * Camera angle
   *
   * 0 = looking at front of puzzle
   * 90 = looking at top of puzzle
   */
  cameraAngle: number,

  /**
   * Camera distance
   *
   * 0 = origin
   */
  cameraDistance: number,

  /**
   * Turn duration in milliseconds
   */
  turnDuration: number,
}

/**
 * Puzzle name
 */
export type PuzzleName = CubeName | DodecaminxName;
