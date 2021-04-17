import { clamp } from 'lodash-es'
import { computed, unref, watch } from 'vue'
import { MaybeRef } from '@vueuse/core'
import { measure, rollArray, translate } from '@/app/utils'
import { Shape, ShapeBufferGeometry } from 'three'
import { useDisposable } from './use-disposable'
import { Vector2 } from '@/app/types/math'

/**
 * Create rounded geometry from points
 */
export function useGeometry(path: MaybeRef<Vector2[]>, radius: MaybeRef<number> = 0) {
  const geometry = computed(() => {
    const shape = new Shape()
    const normalizedRadius = clamp(unref(radius), 0, 1)

    unref(path).forEach((point, index, arr) => {
      if (normalizedRadius === 0) {
        if (index === 0) {
          shape.moveTo(point[0], point[1])
        } else {
          shape.lineTo(point[0], point[1])
        }
      } else {
        const pathFromPoint = rollArray(arr, index)
  
        // find end point of previous curve
        const prev = rollArray(pathFromPoint, -1).shift() as Vector2
        const prev2 = rollArray(pathFromPoint, -2).shift() as Vector2
        const prevCurveDist = Math.min(measure(point, prev) / 2, measure(prev, prev2) / 2) * normalizedRadius
        const prevCurveEnd = translate(prev, point, prevCurveDist)
    
        // find start / end points of current curve
        const next = rollArray(pathFromPoint, 1).shift() as Vector2
        const next2 = rollArray(pathFromPoint, 2).shift() as Vector2
        const curveDist = Math.min(measure(point, next) / 2, measure(next, next2) / 2) * normalizedRadius
        const curveStart = translate(point, prev, curveDist)
        const curveEnd = translate(point, next, curveDist)
    
        // start drawing from the end of the previous curve
        if (index === 0) {
          shape.moveTo(prevCurveEnd[0], prevCurveEnd[1])
        }
    
        // draw line to the start of the current curve
        shape.lineTo(curveStart[0], curveStart[1])

        // draw the current curve
        shape.quadraticCurveTo(point[0], point[1], curveEnd[0], curveEnd[1])
      }
    })

    return new ShapeBufferGeometry(shape)
  })

  // dispose of previous geometry when re-computed
  watch(geometry, (current, prev) => prev.dispose())

  // dispose of current geometry on unmounted
  useDisposable(geometry)

  return geometry
}
