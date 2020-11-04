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
        :geometry="centerGeometry"
        :inner-material="greenMaterial"
        :outer-material="greenMaterial" />

      <v-shape
        :geometry="cornerGeometry"
        :inner-material="redMaterial"
        :outer-material="redMaterial" />
      
      <v-shape
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
import { bilerp, intersect, isEven, midpoint } from '@/app/utils/math';
import { clamp, stubObject } from 'lodash-es';
import { useGeometry } from '@/app/three/behaviors/geometry';
import { Vector2 } from '@/types/math';
import VCore from './core.vue';
import VDodecahedronGeometry from '@/components/three/geometries/dodecahedron-geometry.vue';
import VShape from '@/components/three/utils/shape.vue';
import VSphere from '@/components/three/geometries/sphere-geometry.vue';

type DodecaminxConfig = {
  middleSize: number,
  stickerSpacing: number,
}

// the center of a face
const origin: Vector2 = [0, 0];

export default defineComponent({
  setup(props) {
    const layers = computed(() => props.model.options.size);

    const evenLayers = computed(() => isEven(layers.value));

    const vertices = computed(() => {
      const radius = pentagonCircumradius(dodecahedronEdgeLength(props.radius, 'circumRadius'), 'edgeLength');
      return polygon(5, radius)
    });

    const middleSize = computed(() => {
      return clamp(props.config?.middleSize ?? 0 / layers.value, 0, 1);
    });

    const midpoints = computed(() => {
      const [ v1, v2, v3, v4, v5 ] = vertices.value;
      const alpha = Math.floor(layers.value / 2) / (layers.value + middleSize.value - 1);

      return {
        m1a: bilerp(v1, v2, alpha),
        m1b: bilerp(v2, v1, alpha),
        m2a: bilerp(v2, v3, alpha),
        m2b: bilerp(v3, v2, alpha),
        m3a: bilerp(v3, v4, alpha),
        m3b: bilerp(v4, v3, alpha),
        m4a: bilerp(v4, v5, alpha),
        m4b: bilerp(v5, v4, alpha),
        m5a: bilerp(v5, v1, alpha),
        m5b: bilerp(v1, v5, alpha),
      };
    });

    const centerBounds = computed<Vector2[]>(() => {
      if (evenLayers.value) {
        return [];
      }

      const { m1a, m1b, m2a, m2b, m3a, m3b, m4a, m4b, m5a, m5b } = midpoints.value;

      return [
        intersect([m4b, m1a], [m5b, m2a]),
        intersect([m5b, m2a], [m1b, m3a]),
        intersect([m1b, m3a], [m2b, m4a]),
        intersect([m2b, m4a], [m3b, m5a]),
        intersect([m3b, m5a], [m4b, m1a]),
      ];
    });

    // create boundries for corner matrices
    const cornerBounds = computed<Vector2[]>(() => {
      const [ v1 ] = vertices.value;
      const { m1a, m5b } = midpoints.value;

      if (evenLayers.value) {
        return [v1, m1a, origin, m5b];
      }

      const [ c1 ] = centerBounds.value;

      return [v1, m1a, c1, m5b];
    });

    const edgeBounds = computed<Vector2[]>(() => {
      if (evenLayers.value) {
        return [];
      }

      const [ c1, c2 ] = centerBounds.value;
      const { m1a, m1b } = midpoints.value;

      return [m1a, m1b, c2, c1];
    });

    // temp
    const centerGeometry = useGeometry(centerBounds);
    const cornerGeometry = useGeometry(cornerBounds);
    const edgeGeometry = useGeometry(edgeBounds);

    // temp
    const redMaterial = new MeshLambertMaterial({
      color: 0xff0000,
      side: DoubleSide,
    });

    const greenMaterial = new MeshLambertMaterial({
      color: 0x00ff00,
      side: DoubleSide,
    });

    const blueMaterial = new MeshLambertMaterial({
      color: 0x0000ff,
      side: DoubleSide,
    });

    return {
      blueMaterial,
      centerGeometry,
      cornerGeometry,
      greenMaterial,
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
      default: () => {
        return {
          middleWidth: 1,
          stickerSpacing: 0,
        };
      },
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