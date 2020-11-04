<template>
  <v-shape
    :geometry="cornerGeometry"
    :inner-material="material"
    :outer-material="material" />
</template>

<script lang="ts">
/* eslint-disable */
import { BackSide, CircleGeometry, DoubleSide, FrontSide, Material, MeshLambertMaterial } from 'three';
import { defineComponent, computed, watch } from 'vue';
import { bilerp, degreesToRadians } from '@/app/utils/math';
import { dodecahedronEdgeLength, pentagonCircumradius, pentagonInradius, polygon } from '@/app/utils/geometry';
import { useDisposable } from '@/app/three/behaviors/disposable';
import { useGeometry } from '@/app/three/behaviors/geometry';
import VGroup from '@/components/three/utils/group.vue';
import VShape from '@/components/three/utils/shape.vue';

export default defineComponent({
  setup() {
    // ...
  },
  components: {
    VGroup,
    VShape,
  },
  props: {
    radius: {
      default: 1,
      type: Number,
    },
  }
});
</script>
