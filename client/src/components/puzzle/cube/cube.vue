<template>
  <v-axes-helper />

  <v-sphere-geometry
    color="#444"
    wireframe
    :radius="1" />

  <v-box-geometry
    color="#0f0"
    wireframe
    :dimensions="edgeLength" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { isNumber } from 'lodash-es';
import VAxesHelper from '@/components/three/utils/axes-helper.vue';
import VBoxGeometry from '@/components/three/geometries/box-geometry.vue';
import VSphereGeometry from '@/components/three/geometries/sphere-geometry.vue';

interface CubeConfig {
  colors: [string, string, string, string, string, string],
  innerBrightness: number, // 0 = invisible, 1 = full brightness
  stickerElevation: number, // 0 = no elevation, 1 = sticker dist elevation
  stickerRadius: number, // 0 = square stickers, 1 = circle stickers
  stickerSpacing: number, // 0 = no spacing, 1 = sticker dist spacing
}

// edge length of a cube inside a sphere of radius 1
const baseEdgeLength = 2 / Math.sqrt(3);

export default defineComponent({
  components: {
    VAxesHelper,
    VBoxGeometry,
    VSphereGeometry,
  },
  computed: {
    edgeLength() {
      return baseEdgeLength;
    },
    normalizedConfig(): CubeConfig {
      const {
        innerBrightness,
        stickerElevation,
        stickerRadius,
        stickerSpacing,
      } = this.config;

      return {
        colors: ['#f00', '#0f0', '#00f', '#f0f', '#ff0', '#0ff'],
        innerBrightness: isNumber(innerBrightness) ? innerBrightness : 0,
        stickerElevation: isNumber(stickerElevation) ? stickerElevation : 0,
        stickerRadius: isNumber(stickerRadius) ? stickerRadius : 0,
        stickerSpacing: isNumber(stickerSpacing) ? stickerSpacing : 0,
      };
    },
  },
  props: {
    config: {
      required: true,
      type: Object as PropType<Partial<CubeConfig>>,
    },
  },
});
</script>
