<template>
  <!-- <v-axes-helper /> -->

  <v-sphere-geometry
    color="#444"
    wireframe
    :radius="1" />

  <v-box-geometry
    color="#0f0"
    wireframe
    :dimensions="edgeLength">
    <template #up>
      <v-face
        :materials="materials"
        :geometry="geometry" />
    </template>
  </v-box-geometry>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, PropType, watch } from 'vue';
import { isNumber } from 'lodash-es';
import { DoubleSide, MeshLambertMaterial, Shape, ShapeBufferGeometry } from 'three';
import { useDisposable } from '@/app/three/behaviors/disposable';
import VBoxGeometry from '@/components/three/geometries/box-geometry.vue';
import VFace from './face.vue';
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

/**
 * Create sticker geometry
 */
const createGeometry = (config: CubeConfig, edgeLength: number) => {
  const shape = new Shape();
  const radius = (edgeLength * config.stickerRadius) / 2;

  shape.moveTo(0, radius);
  shape.lineTo(0, edgeLength - radius);
  shape.quadraticCurveTo(0, edgeLength, radius, edgeLength);
  shape.lineTo(edgeLength - radius, edgeLength);
  shape.quadraticCurveTo(edgeLength, edgeLength, edgeLength, edgeLength - radius);
  shape.lineTo(edgeLength, radius);
  shape.quadraticCurveTo(edgeLength, 0, edgeLength - radius, 0);
  shape.lineTo(radius, 0);
  shape.quadraticCurveTo(0, 0, 0, radius);

  return new ShapeBufferGeometry(shape);
}

/**
 * Create sticker materials
 */
const createMaterials = (config: CubeConfig) => {
  return config.colors.map(() => {
    return new MeshLambertMaterial({
      color: 0xff0000,
      side: DoubleSide,
    });
  });
}

/**
 * Dispose of sticker materials
 */
const disposeMaterials = (materials: MeshLambertMaterial[]) => {
  materials.forEach(material => material.dispose());
}

/**
 * Normalize cube config
 */
const normalize = (config: Partial<CubeConfig>): CubeConfig => {
  const {
    innerBrightness,
    stickerElevation,
    stickerRadius,
    stickerSpacing,
  } = config;

  return {
    colors: ['#f00', '#0f0', '#00f', '#f0f', '#ff0', '#0ff'],
    innerBrightness: isNumber(innerBrightness) ? innerBrightness : 0,
    stickerElevation: isNumber(stickerElevation) ? stickerElevation : 0,
    stickerRadius: isNumber(stickerRadius) ? stickerRadius : 0,
    stickerSpacing: isNumber(stickerSpacing) ? stickerSpacing : 0,
  };
}

export default defineComponent({
  setup(props) {
    const config = computed(() => normalize(props.config));

    // sticker geometry
    const geometry = computed(() => createGeometry(config.value, baseEdgeLength));
    watch(geometry, (current, prev) => prev.dispose());
    useDisposable(geometry);

    // sticker materials
    const materials = computed(() => createMaterials(config.value));
    watch(materials, (current, prev) => disposeMaterials(prev));
    onUnmounted(() => disposeMaterials(materials.value));

    return {
      geometry,
      materials,
    };
  },
  components: {
    VBoxGeometry,
    VFace,
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
