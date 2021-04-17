<template>
  <Shape
    v-for="(sticker, index) in stickers"
    :edges-geometry="edgesGeometry"
    :geometry="geometry"
    :hidden="isHidden(sticker)"
    :key="index"
    :inner-material="materials[Number(sticker.value)].innerMaterial"
    :outer-material="materials[Number(sticker.value)].outerMaterial"
    :position="stickerPosition(index)" />
</template>

<script lang="ts">
import { CubeSticker } from '@bedard/twister'
import { defineComponent, PropType } from 'vue'
import { EdgesGeometry, Material, ShapeBufferGeometry } from 'three'
import { Shape } from '@/three/components'
import { XYZ } from '@/three/types'

type StickerData = Record<string, unknown>

export default defineComponent({
  setup(props) {
    const isHidden = (sticker: CubeSticker<StickerData>) => {
      return !props.visibleStickers.includes(sticker)
    }

    return {
      isHidden,
    };
  },
  components: {
    Shape,
  },
  name: 'CubeFace',
  props: {
    edgesGeometry: {
      required: true,
      type: EdgesGeometry,
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
    stickers: {
      required: true,
      type: Array as PropType<CubeSticker<StickerData>[]>,
    },
    stickerPosition: {
      required: true,
      type: Function as PropType<(index: number) => Partial<XYZ>>,
    },
    visibleStickers: {
      required: true,
      type: Array as PropType<CubeSticker<StickerData>[]>,
    },

  }
})
</script>
