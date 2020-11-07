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
        <!-- <v-shape
          :geometry="cornerGeometry"
          :inner-material="redMaterial"
          :outer-material="redMaterial" /> -->
        <v-shape
          v-for="(shape, i) in cornerShapes"
          :geometry="shape"
          :inner-material="coloredMaterials[i % coloredMaterials.length]"
          :key="i"
          :outer-material="coloredMaterials[i % coloredMaterials.length]" />
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
import { bilerp, intersect, isEven, midpoint } from '@/app/utils/math';
import { clamp, stubObject, times } from 'lodash-es';
import { computed, defineComponent, PropType } from 'vue';
import { createShape } from '@/app/three/utils/shape';
import { dodecahedronEdgeLength, pentagonCircumradius, pentagonInradius, polygon } from '@/app/utils/geometry';
import { Dodecaminx } from '@bedard/twister';
import { mapColumns, mapRows } from '@/app/utils/matrix';
import { useGeometry } from '@/app/three/behaviors/geometry';
import { Line2, Vector2 } from '@/types/math';
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

    // value 0 to 1 that defines the center size
    // 0 = corners matrices touch each other
    // 1 = outer edge size is equal to center size when value is 0
    const middleSize = computed(() => {
      return clamp(props.config?.middleSize ?? 0 / layers.value, 0, 1);
    });

    // value 0 to 1 that defines sticker spacing
    // 0 = ...
    // 1 = ...
    const stickerSpacing = computed(() => {
      const stickerSpacing = clamp(props.config?.stickerSpacing ?? 0, 0, 1);
      return evenLayers.value
        ? stickerSpacing * ((2 / 3) / layers.value)
        : stickerSpacing / layers.value;
    });

    // vertices of pentagonal faces
    const vertices = polygon(5, pentagonCircumradius(dodecahedronEdgeLength(1, 'circumRadius'), 'edgeLength'));

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

    // vectors to define shape of center sticker
    // for even-layered puzzles, this will be empty
    const centerVectors = computed<Vector2[]>(() => {
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

    // vectors for corner matrices
    const cornerVectors = computed<Vector2[]>(() => {
      const [ v1 ] = vertices;
      const { m1, m1a, m5, m5b } = midpoints.value;

      if (evenLayers.value) {
        return [
          v1, 
          bilerp(m1, v1, stickerSpacing.value),
          bilerp(origin, v1, stickerSpacing.value), 
          bilerp(m5, v1, stickerSpacing.value),
        ];
      }

      return [
        v1, 
        bilerp(m1a, v1, stickerSpacing.value), 
        bilerp(centerVectors.value[0], v1, stickerSpacing.value), 
        bilerp(m5b, v1, stickerSpacing.value),
      ];
    });

    const cornerShapes = computed(() => {
      const [ c1, c2, c3, c4 ] = cornerVectors.value;
      const matrixLayers = Math.floor(layers.value / 2);
      const colMap = mapColumns(matrixLayers);
      const rowMap = mapRows(matrixLayers);

      return times(matrixLayers ** 2).map((x, i) => {
        const col = colMap[i];
        const row = rowMap[i];

        const top: Line2 = [
          bilerp(c1, c4, row / matrixLayers),
          bilerp(c2, c3, row / matrixLayers),
        ];

        const bottom: Line2 = [
          bilerp(c1, c4, (row + 1) / matrixLayers),
          bilerp(c2, c3, (row + 1) / matrixLayers),
        ];

        const left: Line2 = [
          bilerp(c1, c2, col / matrixLayers),
          bilerp(c4, c3, col / matrixLayers),
        ];

        const right: Line2 = [
          bilerp(c1, c2, (col + 1) / matrixLayers),
          bilerp(c4, c3, (col + 1) / matrixLayers),
        ];

        return createShape([
          intersect(top, left),
          intersect(top, right),
          intersect(bottom, right),
          intersect(bottom, left),
        ]);
      });
    });

    // vectors for edge stickers
    const edgeVectors = computed<Vector2[]>(() => {
      if (evenLayers.value) {
        return [];
      }

      const [ c1, c2 ] = centerVectors.value;
      const { m1a, m1b } = midpoints.value;

      return [
        m1a, 
        m1b, 
        bilerp(c2, m1b, stickerSpacing.value),
        bilerp(c1, m1a, stickerSpacing.value),
      ];
    });

    // temp
    const centerGeometry = useGeometry(centerVectors);
    const cornerGeometry = useGeometry(cornerVectors);
    const edgeGeometry = useGeometry(edgeVectors);

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

    const pinkMaterial = new MeshLambertMaterial({
      color: 0xff00ff,
      side: DoubleSide,
    });

    const coloredMaterials = [
      redMaterial,
      greenMaterial,
      blueMaterial,
      pinkMaterial,
    ];

    return {
      blueMaterial,
      centerGeometry,
      coloredMaterials,
      cornerGeometry,
      cornerShapes,
      edgeGeometry,
      edgeVectors,
      greenMaterial,
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
      default: () => new Dodecaminx({ size: 4 }),
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