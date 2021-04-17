<template>
  <Core />
</template>

<script lang="ts">
import { attempt, isError, isNumber } from 'lodash-es'
import { Cube } from '@bedard/twister'
import { defineComponent } from 'vue'
import { Vector4 } from '@/app/types/math'
import Core from './Core.vue'

import {
  BackSide,
  FrontSide,
  Material,
  MeshLambertMaterial,
} from 'three'

/**
 * Edge length of a cube inside a sphere of radius 1
 */
const baseEdgeLength = 2 / Math.sqrt(3)

/**
 * Create sticker materials
 */
const createMaterials = (colors: string[], innerBrightness: number) => {
  return colors.map((color) => {
    return {
      innerMaterial: new MeshLambertMaterial({
        color,
        opacity: innerBrightness,
        side: BackSide,
        transparent: innerBrightness < 1,
      }),
      outerMaterial: new MeshLambertMaterial({
        color,
        side: FrontSide,
      }),
    }
  })
}

/**
 * Get rotation value for the current turn
 */
const getTurnRotation = (model: Cube, currentTurn: string, turnProgress: number): Vector4 => {
  let x = 0
  let y = 0
  let z = 0
  let deg = 90 * turnProgress

  const parsedTurn = attempt(model.parse, currentTurn)
  
  if (!isError(parsedTurn)) {
    const { target, rotation } = parsedTurn

    // set rotation axis angle
    if (['l', 'r', 'x'].includes(target)) x = 1
    else if (['u', 'd', 'y'].includes(target)) y = 1
    else if (['f', 'b', 'z'].includes(target)) z = 1

    // invert rotation degrees for B, L, and D turns to
    // ensure they are clockwise by default
    if (['b', 'l', 'd'].includes(target)) deg *= -1

    // invert rotation degrees for prime turns
    if (rotation === -1) deg *= -1
  }
  
  return [x, y, z, deg]
}

/**
 * Dispose of sticker materials
 */
 const disposeMaterials = (materials: { innerMaterial: Material, outerMaterial: Material }[]) => {
  materials.forEach(obj => {
    obj.innerMaterial.dispose()
    obj.outerMaterial.dispose()
  })
}

export default defineComponent({
  components: {
    Core,
  },
  name: 'Cube',
})
</script>