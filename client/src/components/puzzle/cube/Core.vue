<template>
  <BoxGeometry
    hidden
    :dimensions="edgeLength"
    :rotation="rotation">
    <template #up>
      <Face
        :edges-geometry="edgesGeometry"
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.u"
        :visible-stickers="visibleStickers" />
    </template>
    <template #left>
      <Face
        :edges-geometry="edgesGeometry"
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.l"
        :visible-stickers="visibleStickers" />
    </template>
    <template #front>
      <Face
        :edges-geometry="edgesGeometry"
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.f"
        :visible-stickers="visibleStickers" />
    </template>
    <template #right>
      <Face
        :edges-geometry="edgesGeometry"
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.r"
        :visible-stickers="visibleStickers" />
    </template>
    <template #back>
      <Face
        :edges-geometry="edgesGeometry"
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.b"
        :visible-stickers="visibleStickers" />
    </template>
    <template #down>
      <Face
        :edges-geometry="edgesGeometry"
        :geometry="geometry"
        :materials="materials"
        :sticker-position="stickerPosition"
        :stickers="model.state.d"
        :visible-stickers="visibleStickers" />
    </template>
  </BoxGeometry>
</template>

<script lang="ts">
import { BoxGeometry } from '@/three/components'
import { Cube, CubeSticker } from '@bedard/twister'
import { defineComponent, PropType } from 'vue'
import { EdgesGeometry, Material, ShapeBufferGeometry } from 'three'
import { useRotationProp } from '@/three/behaviors'
import { XYZ } from '@/three/types'
import Face from './Face.vue'

type StickerData = Record<string, unknown>;

export default defineComponent({
  components: {
    BoxGeometry,
    Face,
  },
  name: 'CubeCore',
  props: {
    edgeLength: {
      required: true,
      type: Number,
    },
    edgesGeometry: {
      required: true,
      type: EdgesGeometry
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