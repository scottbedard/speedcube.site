<template>
  <v-shape
    v-for="(sticker, index) in stickers"
    :geometry="geometry"
    :key="index"
    :inner-material="materials[sticker.value].innerMaterial"
    :outer-material="materials[sticker.value].outerMaterial"
    :position="position(index)" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CubeSticker } from '@bedard/twister';
import { MeshLambertMaterial, ShapeBufferGeometry } from 'three';
import { Vector } from '@/app/three/types';
import VShape from '@/components/three/utils/shape.vue';

type StickerData = Record<string, unknown>;

export default defineComponent({
  components: {
    VShape,
  },
  props: {
    geometry: {
      required: true,
      type: Object as PropType<ShapeBufferGeometry>,
    },
    materials: {
      required: true,
      type: Array as PropType<MeshLambertMaterial[]>,
    },
    position: {
      required: true,
      type: Function as PropType<(index: number) => Partial<Vector>>,
    },
    stickers: {
      required: true,
      type: Object as PropType<CubeSticker<StickerData>[]>,
    },
  },
});
</script>
