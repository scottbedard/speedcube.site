<template>
  <v-shape
    :geometry="geometry"
    :inner-material="material"
    :outer-material="material" />
</template>

<script lang="ts">
/* eslint-disable */
import { BackSide, CircleGeometry, DoubleSide, FrontSide, Material, MeshLambertMaterial } from 'three';
import { defineComponent, computed, watch } from 'vue';
import { degreesToRadians } from '@/app/utils/math';
import { dodecahedronEdgeLength, pentagonCircumradius } from '@/app/utils/geometry';
import { useDisposable } from '@/app/three/behaviors/disposable';
import VGroup from '@/components/three/utils/group.vue';
import VShape from '@/components/three/utils/shape.vue';

// caching a few constants to avoid re-calculating when props changes
const circumradiusDenominator = 2 * Math.sin(degreesToRadians(36));
const edgeLengthDenominator = Math.sqrt(3) * (1 + Math.sqrt(5));
const inradiusDenominator = 2 * Math.tan(degreesToRadians(36));

export default defineComponent({
  setup(props) {
    const geometry = computed(() => {
      const radius = pentagonCircumradius(dodecahedronEdgeLength(props.radius, 'circumRadius'), 'edgeLength');
      return new CircleGeometry(radius, 5, degreesToRadians(90))
    });

    const material = new MeshLambertMaterial({
      color: 0xff0000,
      side: DoubleSide,
    });

    watch(geometry, (cur, prev) => prev.dispose())

    useDisposable(geometry);
    useDisposable(material);

    return {
      geometry,
      material,
    };
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
