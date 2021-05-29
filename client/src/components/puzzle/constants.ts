import { colors } from '@/app/utils'
import { CubeConfig, CubeName } from '@/app/types/puzzle'

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
export const cubeKeyboardConfig: Record<string, string> = {
  'j': 'U',
  'f': 'U-',
  'd': 'L',
  'e': 'L-',
  'h': 'F',
  'g': 'F-',
  'i': 'R',
  'k': 'R-',
  'w': 'B',
  'o': 'B-',
  's': 'D',
  'l': 'D-',
  'J': 'Uw',
  'F': 'Uw-',
  'D': 'Lw',
  'E': 'Lw-',
  'H': 'Fw',
  'G': 'Fw-',
  'I': 'Rw',
  'K': 'Rw-',
  'W': 'Bw',
  'O': 'Bw-',
  'S': 'Dw',
  'L': 'Dw-',
  'a': 'Y-',
  'A': 'Y-',
  ';': 'Y',
  'R': 'X',
  'r': 'X',
  'U': 'X',
  'u': 'X',
  'T': 'X',
  't': 'X',
  'Y': 'X',
  'y': 'X',
  'V': 'X-',
  'v': 'X-',
  'C': 'X-',
  'c': 'X-',
  'N': 'X-',
  'n': 'X-',
  'M': 'X-',
  'm': 'X-',
  'Q': 'Z-',
  'q': 'Z-',
  'P': 'Z',
  'p': 'Z',
}
