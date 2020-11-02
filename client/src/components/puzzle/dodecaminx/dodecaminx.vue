<template>
  <v-core :radius="radius" />
  <v-sphere
    :height-segments="50"
    :width-segments="50"
    wireframe
    :color="0x444444"
    :radius="1" />
</template>

<script lang="ts">
/* eslint-disable */
import { BackSide, CircleGeometry, DoubleSide, FrontSide, Material, MeshLambertMaterial } from 'three';
import { defineComponent, PropType } from 'vue';
import { Dodecaminx } from '@bedard/twister';
import { stubObject } from 'lodash-es';
import { useGeometry } from '@/app/three/behaviors/geometry';
import VCore from './core.vue';
import VShape from '@/components/three/utils/shape.vue';
import VSphere from '@/components/three/geometries/sphere-geometry.vue';

type DodecaminxConfig = {
  // ...
}

export default defineComponent({
  setup() {
    // ...
  },
  components: {
    VCore,
    VSphere,
  },
  props: {
    config: {
      default: stubObject,
      type: Object as PropType<Partial<DodecaminxConfig>>,
    },
    currentTurn: {
      default: '',
      type: String,
    },
    model: {
      default: () => new Dodecaminx({ size: 3 }),
      type: Object as PropType<Dodecaminx>,
    },
    radius: {
      default: 1,
      type: Number,
    },
    turnProgress: {
      default: 0,
      type: Number,
    },
  },
});
</script>