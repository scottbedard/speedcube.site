<template>
  <!-- <v-core :radius="radius" /> -->

  <!-- temp: this will be moved to a core -->
  <v-dodecahedron-geometry
    :geometry-hidden="false"
    :radius="radius"
    :wireframe="true">
    <template #u>
      <!-- temp: this will be moved to a face -->
      <v-shape
        :geometry="cornerGeometry"
        :inner-material="redMaterial"
        :outer-material="redMaterial" />
      
      <v-shape
        v-if="edgeGeometry"
        :geometry="edgeGeometry"
        :inner-material="blueMaterial"
        :outer-material="blueMaterial" />
    </template>
  </v-dodecahedron-geometry>

  <v-sphere
    :color="0x444444"
    :height-segments="50"
    :hidden="true"
    :radius="1"
    :width-segments="50"
    :wireframe="true" />
</template>

<script lang="ts">
/* eslint-disable */
import { BackSide, CircleGeometry, DoubleSide, FrontSide, Material, MeshLambertMaterial } from 'three';
import { computed, defineComponent, PropType } from 'vue';
import { dodecahedronEdgeLength, pentagonCircumradius, pentagonInradius, polygon } from '@/app/utils/geometry';
import { Dodecaminx } from '@bedard/twister';
import { intersect, isEven, midpoint } from '@/app/utils/math';
import { stubObject } from 'lodash-es';
import { useGeometry } from '@/app/three/behaviors/geometry';
import { Vector2 } from '@/types/math';
import VCore from './core.vue';
import VDodecahedronGeometry from '@/components/three/geometries/dodecahedron-geometry.vue';
import VShape from '@/components/three/utils/shape.vue';
import VSphere from '@/components/three/geometries/sphere-geometry.vue';

type DodecaminxConfig = {
  // ...
}

// the center of a face
const origin: Vector2 = [0, 0];

export default defineComponent({
  setup(props) {
    // create pentagonal polygon to calculate sticker shapes from
    const evenLayers = computed(() => isEven(props.model.options.size));

    const pentagon = computed(() => {
      const radius = pentagonCircumradius(dodecahedronEdgeLength(props.radius, 'circumRadius'), 'edgeLength');
      return polygon(5, radius)
    });

    const midpoints = computed(() => {
      return pentagon.value.map((v, i, arr) => midpoint(v, arr[(i + 1) % 5]))
    });

    // create boundries for corner matrices
    const cornerBounds = computed<Vector2[]>(() => {
      const [v1] = pentagon.value;
      const [m1, m2,, m4, m5] = midpoints.value;
      return evenLayers.value
        ? [v1, m1, origin, m5]
        : [v1, m1, intersect([m1, m4], [m5, m2]), m5];
    });

    const edgeBounds = computed<Vector2[]>(() => {
      const [m1, m2, m3, m4, m5] = midpoints.value;
      return evenLayers.value
        ? []
        : [m1, intersect([m1, m3], [m5, m2]), intersect([m5, m2], [m4, m1])];
    });

    // temp
    const cornerGeometry = useGeometry(cornerBounds, 0.2);

    const edgeGeometry = edgeBounds.value !== null && useGeometry(edgeBounds.value);

    // temp
    const redMaterial = new MeshLambertMaterial({
      color: 0xff0000,
      side: DoubleSide,
    });

    const blueMaterial = new MeshLambertMaterial({
      color: 0x0000fff,
      side: DoubleSide,
    });

    return {
      blueMaterial,
      cornerGeometry,
      edgeBounds,
      edgeGeometry,
      redMaterial,
    }
  },
  components: {
    VCore,
    VDodecahedronGeometry,
    VShape,
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