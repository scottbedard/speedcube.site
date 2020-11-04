<template>
  <!-- <v-core :radius="radius" /> -->

  <!-- temp: this will be moved to a core -->
  <v-dodecahedron-geometry
    :geometry-hidden="false"
    :radius="radius"
    :wireframe="true">
    <template
      v-for="face in ['u', 'f', 'l', 'r']"
      :key="face"
      v-slot:[face]>
      <!-- temp: this will be moved to a face -->
      <v-shape
        :geometry="centerGeometry"
        :inner-material="greenMaterial"
        :outer-material="greenMaterial" />

      <v-group
        v-for="n in 5"
        :key="n"
        :rotation="[0, 0, 1, 72 * n]">
        <v-shape
          :geometry="cornerGeometry"
          :inner-material="redMaterial"
          :outer-material="redMaterial" />
      </v-group>
      
      <v-group
        v-for="n in 5"
        :key="n"
        :rotation="[0, 0, 1, 72 * n]">
        <v-shape
          :geometry="edgeGeometry"
          :inner-material="blueMaterial"
          :outer-material="blueMaterial" />
      </v-group>
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
import VGroup from '@/components/three/utils/group.vue';
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

    const vertices = polygon(5, pentagonCircumradius(dodecahedronEdgeLength(1, 'circumRadius'), 'edgeLength'));

    const middleSize = computed(() => {
      return clamp(props.config?.middleSize ?? 0 / layers.value, 0, 1);
    });

    const stickerSpacingAlpha = computed(() => {
      const stickerSpacing = clamp(props.config?.stickerSpacing ?? 0, 0, 1);
      return evenLayers.value
        ? stickerSpacing * ((2 / 3) / layers.value)
        : stickerSpacing / layers.value;
    });

    const midpoints = computed(() => {
      const [ v1, v2, v3, v4, v5 ] = vertices;
      const alpha = Math.floor(layers.value / 2) / (layers.value + middleSize.value - 1);

      return {
        m1: bilerp(v1, v2, 0.5),
        m1a: bilerp(v1, v2, alpha),
        m1b: bilerp(v2, v1, alpha),
        m2a: bilerp(v2, v3, alpha),
        m2b: bilerp(v3, v2, alpha),
        m3a: bilerp(v3, v4, alpha),
        m3b: bilerp(v4, v3, alpha),
        m4a: bilerp(v4, v5, alpha),
        m4b: bilerp(v5, v4, alpha),
        m5: bilerp(v5, v1, 0.5),
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
      const [ v1 ] = vertices;
      const { m1, m1a, m5, m5b } = midpoints.value;

      if (evenLayers.value) {
        return [
          v1, 
          bilerp(m1, v1, stickerSpacingAlpha.value),
          bilerp(origin, v1, stickerSpacingAlpha.value), 
          bilerp(m5, v1, stickerSpacingAlpha.value),
        ];
      }

      const [ c1 ] = centerBounds.value;

      return [
        v1, 
        bilerp(m1a, v1, stickerSpacingAlpha.value), 
        bilerp(c1, v1, stickerSpacingAlpha.value), 
        bilerp(m5b, v1, stickerSpacingAlpha.value),
      ];
    });

    const edgeBounds = computed<Vector2[]>(() => {
      if (evenLayers.value) {
        return [];
      }

      const [ c1, c2 ] = centerBounds.value;
      const { m1a, m1b } = midpoints.value;

      return [
        m1a, 
        m1b, 
        bilerp(c2, m1b, stickerSpacingAlpha.value),
        bilerp(c1, m1a, stickerSpacingAlpha.value),
      ];
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
    VGroup,
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