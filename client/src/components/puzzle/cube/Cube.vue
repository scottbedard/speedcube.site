<template>
  <Core />
</template>

<script lang="ts">
import { attempt, isArray, isError, isNumber } from 'lodash-es'
import { Cube } from '@bedard/twister'
import { cubeConfig } from '../constants'
import { CubeConfig } from '@/app/types/puzzle'
import { mapColumns, mapRows } from '@/app/utils'
import { useGeometry } from '@/three/behaviors'
import { Vector4 } from '@/app/types/math'
import Core from './Core.vue'

import {
  BackSide,
  FrontSide,
  Material,
  MeshLambertMaterial,
} from 'three'

import {
  computed,
  defineComponent,
  onUnmounted,
  PropType,
  watch,
} from 'vue'

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
  setup(props) {
    // normalize configuration
    const colors = computed(() => isArray(props.config.colors) ? props.config.colors : cubeConfig.colors)
    const innerBrightness = computed(() => isNumber(props.config.innerBrightness) ? props.config.innerBrightness : cubeConfig.innerBrightness)
    const stickerRadius = computed(() => isNumber(props.config.stickerRadius) ? props.config.stickerRadius : cubeConfig.stickerRadius)
    const stickerSpacing = computed(() => isNumber(props.config.stickerSpacing) ? props.config.stickerSpacing : cubeConfig.stickerSpacing)
    const stickerElevation = computed(() => isNumber(props.config.stickerElevation) ? props.config.stickerElevation : cubeConfig.stickerElevation)
  
    // cube values
    const colMap = computed(() => mapColumns(props.model.options.size))
    const rowMap = computed(() => mapRows(props.model.options.size))
    const stickerLength = computed(() => baseEdgeLength / props.model.options.size)
    const stickerSpacingGap = computed(() => stickerLength.value * stickerSpacing.value)
    const stickerSpacingOffset = computed(() => (stickerSpacingGap.value * (props.model.options.size - 1)) / 2)
    const stickerXOffset = computed(() => baseEdgeLength / -2)
    const stickerYOffset = computed(() => (baseEdgeLength / 2) - stickerLength.value)
    const edgeLength = computed(() => baseEdgeLength + (stickerSpacingGap.value * (props.model.options.size - 1)) + (stickerLength.value * stickerElevation.value * 2))
    const turnRotation = computed(() => getTurnRotation(props.model, props.currentTurn, props.turnProgress))
  
    // determine which stickers are turning and which are idle
    const allStickers = computed(() => props.model.state.u.concat(
      props.model.state.l,
      props.model.state.f,
      props.model.state.r,
      props.model.state.b,
      props.model.state.d,
    ))

    const turningStickers = computed(() => {
      const stickers = attempt(() => props.model.getStickersForTurn(props.currentTurn))
      return !isError(stickers) ? stickers : []
    })

    const idleStickers = computed(() => {
      return allStickers.value.filter(sticker => !turningStickers.value.includes(sticker))
    })

    // calculate sticker position by index
    const stickerPosition = (index: number) => {
      const col = colMap.value[index]
      const row = rowMap.value[index]
      
      return {
        x: stickerXOffset.value + (stickerLength.value * col) + (stickerSpacingGap.value * col) - stickerSpacingOffset.value,
        y: stickerYOffset.value - (stickerLength.value * row) - (stickerSpacingGap.value * row) + stickerSpacingOffset.value,
      }
    }

    // square sticker geometry
    const geometry = useGeometry([
      [0, 0],
      [0, stickerLength.value],
      [stickerLength.value, stickerLength.value],
      [stickerLength.value, 0],
    ], stickerRadius)

    // sticker materials
    const materials = computed(() => createMaterials(colors.value, innerBrightness.value))

    watch(materials, (current, prev) => disposeMaterials(prev))

    onUnmounted(() => disposeMaterials(materials.value))

    return {
      edgeLength,
      geometry,
      idleStickers,
      materials,
      stickerPosition,
      turningStickers,
      turnRotation,
    }
  },
  components: {
    Core,
  },
  name: 'Cube',
  props: {
    config: {
      required: true,
      type: Object as PropType<Partial<CubeConfig>>,
    },
    currentTurn: {
      default: '',
      type: String,
    },
    model: {
      required: true,
      type: Object as PropType<Cube>,
    },
    turnProgress: {
      default: 0,
      type: Number,
    },
  },
})
</script>