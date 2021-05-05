import { CubeConfig, CubeName, KeyboardConfig } from '@/app/types/puzzle'

/**
 * Default colors
 */
export const colors: Record<string, string> = {
  blue: '#2563EB',
  creme: '#fbd38d',
  gray: '#718096',
  green: '#059669',
  lightBlue: '#90cdf4',
  lightGreen: '#9ae6b5',
  orange: '#ed8836',
  pink: '#f687b3',
  purple: '#9f7aea',
  red: '#e53e3e',
  white: '#f7fafc',
  yellow: '#f6e05e',
}

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
}

/**
 * Cube identifiers
 */
export const cubeNames: CubeName[] = [
  '2x2',
  '3x3',
  '4x4',
  '5x5',
]

/**
 * Default cube keyboard configuration.
 */
export const cubeKeyboardConfig: KeyboardConfig = {
  default: {},
  keyspaces: {},
}
