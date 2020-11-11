<template>
  <!-- <v-core :radius="radius" /> -->

  <!-- temp: this will be moved to a core -->
  <v-dodecahedron-geometry
    :geometry-hidden="false"
    :radius="radius"
    :wireframe="true">
    <template
      v-for="face in ['u', 'l', 'f', 'r', 'bl', 'br']"
      :key="face"
      v-slot:[face]>
      <!-- temp: this will be moved to a face -->
      <v-shape
        v-if="centerShape"
        :geometry="centerShape"
        :inner-material="blueMaterial"
        :outer-material="blueMaterial" />

      <v-group
        v-for="n in 5"
        :key="n"
        :rotation="[0, 0, 1, 72 * n]">
        <v-shape
          v-for="(shape, i) in cornerShapes"
          :geometry="shape"
          :inner-material="coloredMaterials[i % coloredMaterials.length]"
          :key="`corner-${i}`"
          :outer-material="coloredMaterials[i % coloredMaterials.length]" />
        <v-shape
          v-for="(shape, i) in middleShapes"
          :geometry="shape"
          :inner-material="coloredMaterials[i % coloredMaterials.length]"
          :key="`middle-${i}`"
          :outer-material="coloredMaterials[i % coloredMaterials.length]" />
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
import { bilerp, intersect, isEven, midpoint, translate } from '@/app/utils/math';
import { clamp, stubObject, times } from 'lodash-es';
import { computed, defineComponent, onUnmounted, PropType, watch } from 'vue';
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
  stickerRadius: number,
}

// geometry constants for a dodecahedron inside a sphere of radius 1
const edgeLength = dodecahedronEdgeLength(1, 'circumRadius');
const pentagonRadius = pentagonCircumradius(edgeLength, 'edgeLength');
const vertices = polygon(5, pentagonRadius);

// minimum middle size
// we cannot use Number.EPSILON here because it breaks BufferGeometry.computeBoundingSphere
const minMiddleSize = 0.0000001;

// the center of a face
const origin: Vector2 = [0, 0];

export default defineComponent({
  setup(props) {
    // number of puzzle layers and if that is an even number
    const layers = computed(() => props.model.options.size);
    const evenLayers = computed(() => isEven(layers.value));
    const matrixLayers = computed(() => Math.floor(layers.value / 2));

    // radius of sticker geometries
    // 0 = no radius
    // 1 = half the distance to nearest corner
    const stickerRadius = computed(() => clamp(props.config?.stickerRadius ?? 0, 0, 1));

    // size of gap between adjacent stickers
    // 0 = no gap between stickers
    // 1 = layerSize gap between stickers
    const stickerSpacing = computed(() => clamp(props.config?.stickerSpacing ?? 0, 0, 1));

    // size of middle segment for odd-layered puzzles
    // 0 = adjacent corner matrices
    // 1 = corner matrices one layer length apart
    const middleSize = computed(() => {
      return clamp(props.config?.middleSize ?? 0, minMiddleSize, 1) * (
        layers.value / (layers.value + (layers.value * stickerSpacing.value))
      );
    });
    
    // midpoints between vertices that are needed to calculate sticker shapes
    const midpoints = computed(() => {
      const [ v1, v2, v3, v4, v5 ] = vertices;
      const alpha = matrixLayers.value / (layers.value + middleSize.value - 1);

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
      if (evenLayers.value) return [];

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
      const usedArea = matrixLayers.value + ((matrixLayers.value - 1) * stickerSpacing.value);
      const totalArea = matrixLayers.value + (matrixLayers.value * stickerSpacing.value);

      if (evenLayers.value) {
        // for even layer puzzles we subtract half sticker spacing from
        // the total area because there is no middle segment, so the two
        // spacing gaps in the center should be counted as one gap.
        const alpha = usedArea / (totalArea - (stickerSpacing.value / 2));

        return [
          v1,
          bilerp(v1, m1, alpha),
          bilerp(v1, origin, alpha),
          bilerp(v1, m5, alpha),
        ];
      }

      const alpha = usedArea / totalArea;

      return [
        v1,
        bilerp(v1, m1a, alpha),
        bilerp(v1, centerVectors.value[0], alpha),
        bilerp(v1, m5b, alpha),
      ];
    });

    // center shape geometry
    const centerShape = computed(() => !evenLayers.value && createShape(centerVectors, stickerRadius));

    // shape geometries for corner stickers
    const cornerShapes = computed(() => {
      const [ c1, c2, c3, c4 ] = cornerVectors.value;
      const colMap = mapColumns(matrixLayers.value);
      const rowMap = mapRows(matrixLayers.value);
      const matrixAndSpacing = matrixLayers.value + ((matrixLayers.value - 1) * stickerSpacing.value);

      return times(matrixLayers.value ** 2).map((x, i) => {
        const col = colMap[i];
        const row = rowMap[i];
        const topAlpha = (row + (row * stickerSpacing.value)) / matrixAndSpacing;
        const leftAlpha = (col + (col * stickerSpacing.value)) / matrixAndSpacing;
        const bottomAlpha = (row + 1 + (row * stickerSpacing.value)) / matrixAndSpacing;
        const rightAlpha = (col + 1 + (col * stickerSpacing.value)) / matrixAndSpacing;
        const top: Line2 = [bilerp(c1, c4, topAlpha), bilerp(c2, c3, topAlpha)];
        const left: Line2 = [bilerp(c1, c2, leftAlpha), bilerp(c4, c3, leftAlpha)];
        const bottom: Line2 = [bilerp(c1, c4, bottomAlpha), bilerp(c2, c3, bottomAlpha)];
        const right: Line2 = [bilerp(c1, c2, rightAlpha), bilerp(c4, c3, rightAlpha)];

        return createShape([
          intersect(top, left),
          intersect(top, right),
          intersect(bottom, right),
          intersect(bottom, left),
        ], stickerRadius);
      });
    });

    // shape geometries for middle stickers
    const middleShapes = computed(() => {
      if (evenLayers.value) return [];

      const [ c1, c2 ] = centerVectors.value;
      const { m1a, m1b } = midpoints.value;
  
      return times(matrixLayers.value).map((x, i) => {
        const topAlpha = i / matrixLayers.value;
        const bottomAlpha = (i + 1 + (i * stickerSpacing.value)) / (matrixLayers.value + (matrixLayers.value * stickerSpacing.value));

        const right: Line2 = [m1b, c2];
        const left: Line2 = [c1, m1a];
        const top: Line2 = [bilerp(m1a, c1, topAlpha), bilerp(m1b, c2, topAlpha)];
        const bottom: Line2 = [bilerp(m1a, c1, bottomAlpha), bilerp(m1b, c2, bottomAlpha)];

        return createShape([
          intersect(left, top),
          intersect(top, right),
          intersect(right, bottom),
          intersect(bottom, left),
        ], stickerRadius);
      });
    });

    // dispose old shape geometries
    watch(centerShape, (cur, prev) => prev && prev.dispose());
    watch(cornerShapes, (cur, prev) => prev.forEach(obj => obj.dispose()));
    watch(middleShapes, (cur, prev) => prev.forEach(obj => obj.dispose()));

    onUnmounted(() => {
      centerShape.value && centerShape.value.dispose();
      cornerShapes.value.forEach(obj => obj.dispose());
      middleShapes.value.forEach(obj => obj.dispose());
    });

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
      centerShape,
      coloredMaterials,
      cornerShapes,
      greenMaterial,
      middleShapes,
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
      default: () => new Dodecaminx({ size: 5 }),
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