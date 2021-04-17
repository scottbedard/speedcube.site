import { colors } from '../constants'
import { CubeConfig } from '@/app/types/puzzle'

/**
 * Default cube configuration.
 */
export const defaultConfig: CubeConfig = {
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
