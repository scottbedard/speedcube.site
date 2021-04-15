import { Object3D } from 'three'
import { watchEffect } from 'vue'
import { Vector } from '@/three/types'

/**
 * Set an objects position from a vector
 */
 export function usePosition(obj: Object3D, position: () => Partial<Vector>) {
  watchEffect(() => {
    const { x, y, z } = position()

    obj.position.x = x || 0
    obj.position.y = y || 0
    obj.position.z = z || 0
  })
}
