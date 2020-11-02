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
        :inner-material="material"
        :outer-material="material" />
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
import { isEven, midpoint } from '@/app/utils/math';
import { stubObject } from 'lodash-es';
import { useGeometry } from '@/app/three/behaviors/geometry';
import { Polygon, Vector2 } from '@/types/math';
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
    const pentagon = computed(() => {
      const radius = pentagonCircumradius(dodecahedronEdgeLength(props.radius, 'circumRadius'), 'edgeLength');
      return polygon(5, radius)
    });

    // create boundries for corner matrices
    const cornerBounds = computed(() => {
      const [v1, v2,,, v5] = pentagon.value;

      if (isEven(props.model.options.size)) {
        return [v1, midpoint(v1, v2), origin, midpoint(v5, v1)] as Polygon;
      }

      throw 'odd layers not implemented yet';
    });

    // temp
    const cornerGeometry = useGeometry(cornerBounds);

    // temp
    const material = new MeshLambertMaterial({
      color: 0xff0000,
      side: DoubleSide,
    });

    return {
      cornerGeometry,
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
      default: () => new Dodecaminx({ size: 2 }),
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