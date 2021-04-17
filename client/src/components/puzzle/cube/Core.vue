<template>
  <BoxGeometry
    :dimensions="edgeLength"
    :rotation="rotation">
    <template #up>
      <Face
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.u"
        :visible-stickers="visibleStickers" />
    </template>
    <template #left>
      <AxesHelper :size="0.5" />
    </template>
    <template #front>
      <AxesHelper :size="0.5" />
    </template>
    <template #right>
      <AxesHelper :size="0.5" />
    </template>
    <template #back>
      <AxesHelper :size="0.5" />
    </template>
    <template #down>
      <AxesHelper :size="0.5" />
    </template>
  </BoxGeometry>
</template>

<script lang="ts">
import { AxesHelper, BoxGeometry } from '@/three/components'
import { Cube, CubeSticker } from '@bedard/twister'
import { defineComponent, PropType } from 'vue'
import { Material, ShapeBufferGeometry } from 'three'
import { useRotationProp } from '@/three/behaviors'
import { XYZ } from '@/three/types'
import Face from './Face.vue'

type StickerData = Record<string, unknown>;

export default defineComponent({
  components: {
    AxesHelper,
    BoxGeometry,
    Face,
  },
  name: 'CubeCore',
  props: {
    edgeLength: {
      required: true,
      type: Number,
    },
    geometry: {
      required: true,
      type: Object as PropType<ShapeBufferGeometry>,
    },
    materials: {
      required: true,
      type: Array as PropType<
        Array<{
          innerMaterial: Material,
          outerMaterial: Material,
        }>
      >,
    },
    model: {
      required: true,
      type: Object as PropType<Cube>,
    },
    rotation: useRotationProp,
    stickerPosition: {
      required: true,
      type: Function as PropType<(index: number) => Partial<XYZ>>,
    },
    visibleStickers: {
      required: true,
      type: Array as PropType<CubeSticker<StickerData>[]>,
    },
  },
})
</script>