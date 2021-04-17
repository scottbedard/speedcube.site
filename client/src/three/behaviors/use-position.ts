import { Object3D } from 'three'
import { PropType, watchEffect } from 'vue'
import { stubObject } from 'lodash-es'
import { XYZ } from '@/three/types'

export const usePositionProp = {
  default: stubObject,
  type: Object as PropType<Partial<XYZ>>
}

/**
 * Set an objects position from a vector
 */
 export function usePosition(obj: Object3D, position: () => Partial<XYZ>) {
  watchEffect(() => {
    const { x, y, z } = position()

    obj.position.x = x || 0
    obj.position.y = y || 0
    obj.position.z = z || 0
  })
}
