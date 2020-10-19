<template>
  <v-core
    :edge-length="edgeLength"
    :geometry="geometry"
    :materials="materials"
    :model="model"
    :sticker-position="stickerPosition" />
</template>

<script lang="ts">
import { BackSide, FrontSide, Material, MeshLambertMaterial, Shape, ShapeBufferGeometry } from 'three';
import { computed, defineComponent, onUnmounted, PropType, watch } from 'vue';
import { Cube } from '@bedard/twister';
import { isNumber, times } from 'lodash-es';
import { useDisposable } from '@/app/three/behaviors/disposable';
import VCore from './core.vue';

interface CubeConfig {
  colors: [string, string, string, string, string, string],
  innerBrightness: number, // 0 = invisible, 1 = full brightness
  stickerElevation: number, // 0 = no elevation, 1 = sticker dist elevation
  stickerRadius: number, // 0 = square stickers, 1 = circle stickers
  stickerSpacing: number, // 0 = no spacing, 1 = sticker dist spacing
}

/**
 * Edge length of a cube inside a sphere of radius 1
 */
const baseEdgeLength = 2 / Math.sqrt(3);

/**
 * Create sticker geometry
 */
const createGeometry = (config: CubeConfig, stickerLength: number) => {
  const shape = new Shape();
  const radius = (stickerLength * config.stickerRadius) / 2;

  shape.moveTo(0, radius);
  shape.lineTo(0, stickerLength - radius);
  shape.quadraticCurveTo(0, stickerLength, radius, stickerLength);
  shape.lineTo(stickerLength - radius, stickerLength);
  shape.quadraticCurveTo(stickerLength, stickerLength, stickerLength, stickerLength - radius);
  shape.lineTo(stickerLength, radius);
  shape.quadraticCurveTo(stickerLength, 0, stickerLength - radius, 0);
  shape.lineTo(radius, 0);
  shape.quadraticCurveTo(0, 0, 0, radius);

  return new ShapeBufferGeometry(shape);
}

/**
 * Create sticker materials
 */
const createMaterials = (config: CubeConfig) => {
  return config.colors.map((color) => {
    return {
      innerMaterial: new MeshLambertMaterial({
        color,
        opacity: config.innerBrightness,
        side: BackSide,
        transparent: config.innerBrightness < 1,
      }),
      outerMaterial: new MeshLambertMaterial({
        color,
        side: FrontSide,
      }),
    };
  });
}

/**
 * Dispose of sticker materials
 */
const disposeMaterials = (materials: { innerMaterial: Material, outerMaterial: Material }[]) => {
  materials.forEach(obj => {
    obj.innerMaterial.dispose();
    obj.outerMaterial.dispose();
  });
}

/**
 * Create column map.
 */
const mapColumns = (n: number) => times(n ** 2).map((x, i) => i % n);

/**
 * Create row map.
 */
const mapRows = (n: number) => times(n ** 2).map((x, i) => Math.floor(i / n));

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
    const colMap = computed(() => mapColumns(props.model.options.size));
    const config = computed(() => normalize(props.config));
    const rowMap = computed(() => mapRows(props.model.options.size));
    const stickerLength = computed(() => baseEdgeLength / props.model.options.size);
    const stickerSpacingGap = computed(() => stickerLength.value * config.value.stickerSpacing);
    const stickerSpacingOffset = computed(() => (stickerSpacingGap.value * (props.model.options.size - 1)) / 2);
    const stickerXOffset = computed(() => baseEdgeLength / -2);
    const stickerYOffset = computed(() => (baseEdgeLength / 2) - stickerLength.value);
    const edgeLength = computed(() => baseEdgeLength + (stickerSpacingGap.value * (props.model.options.size - 1)) + (stickerLength.value * config.value.stickerElevation * 2));

    // calculate position a sticker by index
    const stickerPosition = (index: number) => {
      const col = colMap.value[index];
      const row = rowMap.value[index];
      
      return {
        x: stickerXOffset.value + (stickerLength.value * col) + (stickerSpacingGap.value * col) - stickerSpacingOffset.value,
        y: stickerYOffset.value - (stickerLength.value * row) - (stickerSpacingGap.value * row) + stickerSpacingOffset.value,
      };
    }

    // sticker geometry
    const geometry = computed(() => createGeometry(config.value, stickerLength.value));
    watch(geometry, (current, prev) => prev.dispose());
    useDisposable(geometry);

    // sticker materials
    const materials = computed(() => createMaterials(config.value));
    watch(materials, (current, prev) => disposeMaterials(prev));
    onUnmounted(() => disposeMaterials(materials.value));

    return {
      edgeLength,
      geometry,
      materials,
      stickerPosition,
    };
  },
  components: {
    VCore,
  },
  computed: {
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
    model: {
      required: true,
      type: Object as PropType<Cube>,
    },
  },
});
</script>
