<template>
  <v-core
    :edge-length="edgeLength"
    :geometry="geometry"
    :materials="materials"
    :model="model"
    :sticker-position="stickerPosition"
    :visible-stickers="idleStickers" />
  <v-core
    :edge-length="edgeLength"
    :geometry="geometry"
    :materials="materials"
    :model="model"
    :rotation="turnRotation"
    :sticker-position="stickerPosition"
    :visible-stickers="turningStickers" />
</template>

<script lang="ts">
import { attempt, isError, isNumber } from 'lodash-es';
import { BackSide, FrontSide, Material, MeshLambertMaterial } from 'three';
import { computed, defineComponent, onUnmounted, PropType, watch } from 'vue';
import { Cube } from '@bedard/twister';
import { CubeConfig } from '@/types/puzzle';
import { mapColumns, mapRows } from '@/app/utils/matrix';
import { Rotation } from '@/app/three/behaviors/rotation';
import { useGeometry } from '@/app/three/behaviors/geometry';
import VCore from './core.vue';

/**
 * Edge length of a cube inside a sphere of radius 1
 */
const baseEdgeLength = 2 / Math.sqrt(3);

/**
 * Create sticker materials
 */
const createMaterials = (colors: string[], innerBrightness: number) => {
  return colors.map((color) => {
    return {
      innerMaterial: new MeshLambertMaterial({
        color,
        opacity: innerBrightness,
        side: BackSide,
        transparent: innerBrightness < 1,
      }),
      outerMaterial: new MeshLambertMaterial({
        color,
        side: FrontSide,
      }),
    };
  });
}

/**
 * Get rotation value for the current turn.
 */
const getTurnRotation = (model: Cube, currentTurn: string, turnProgress: number): Rotation => {
  let x = 0;
  let y = 0;
  let z = 0;
  let deg = 90 * turnProgress;

  const parsedTurn = attempt(model.parse, currentTurn);
  
  if (!isError(parsedTurn)) {
    const { target, rotation } = parsedTurn;

    // set rotation axis angle
    if (target === 'l' || target === 'r' || target === 'x') x = 1;
    else if (target === 'u' || target === 'd' || target === 'y') y = 1;
    else if (target === 'f' || target === 'b' || target === 'z') z = 1;

    // invert rotation degrees for B, L, and D turns to
    // ensure they are clockwise by default
    if (target === 'b' || target === 'l' || target === 'd') deg *= -1;

    // invert rotation degrees for prime turns
    if (rotation === -1) deg *= -1;
  }
  
  return [x, y, z, deg];
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

export default defineComponent({
  setup(props) {
    // normalize configuration
    const colors = computed(() => ['#F6E05E', '#ED8936', '#3182CE', '#E53E3E', '#48BB78', '#F7FAFC']);
    const innerBrightness = computed(() => isNumber(props.config.innerBrightness) ? props.config.innerBrightness : 0);
    const stickerRadius = computed(() => isNumber(props.config.stickerRadius) ? props.config.stickerRadius : 0);
    const stickerSpacing = computed(() => isNumber(props.config.stickerSpacing) ? props.config.stickerSpacing : 0);
    const stickerElevation = computed(() => isNumber(props.config.stickerElevation) ? props.config.stickerElevation : 0);

    const colMap = computed(() => mapColumns(props.model.options.size));
    const rowMap = computed(() => mapRows(props.model.options.size));
    const stickerLength = computed(() => baseEdgeLength / props.model.options.size);
    const stickerSpacingGap = computed(() => stickerLength.value * stickerSpacing.value);
    const stickerSpacingOffset = computed(() => (stickerSpacingGap.value * (props.model.options.size - 1)) / 2);
    const stickerXOffset = computed(() => baseEdgeLength / -2);
    const stickerYOffset = computed(() => (baseEdgeLength / 2) - stickerLength.value);
    const edgeLength = computed(() => baseEdgeLength + (stickerSpacingGap.value * (props.model.options.size - 1)) + (stickerLength.value * stickerElevation.value * 2));
    const turnRotation = computed(() => getTurnRotation(props.model, props.currentTurn, props.turnProgress));

    // determine which stickers are turning and which are idle
    const allStickers = computed(() => props.model.state.u.concat(
      props.model.state.l,
      props.model.state.f,
      props.model.state.r,
      props.model.state.b,
      props.model.state.d,
    ));

    const turningStickers = computed(() => {
      const stickers = attempt(() => props.model.getStickersForTurn(props.currentTurn));
      return !isError(stickers) ? stickers : [];
    });

    const idleStickers = computed(() => {
      return allStickers.value.filter(sticker => !turningStickers.value.includes(sticker));
    });
  
    // calculate position a sticker by index
    const stickerPosition = (index: number) => {
      const col = colMap.value[index];
      const row = rowMap.value[index];
      
      return {
        x: stickerXOffset.value + (stickerLength.value * col) + (stickerSpacingGap.value * col) - stickerSpacingOffset.value,
        y: stickerYOffset.value - (stickerLength.value * row) - (stickerSpacingGap.value * row) + stickerSpacingOffset.value,
      };
    }

    const geometry = useGeometry([
      [0, 0],
      [0, stickerLength.value],
      [stickerLength.value, stickerLength.value],
      [stickerLength.value, 0],
    ], stickerRadius);

    // sticker materials
    const materials = computed(() => createMaterials(colors.value, innerBrightness.value));
    watch(materials, (current, prev) => disposeMaterials(prev));
    onUnmounted(() => disposeMaterials(materials.value));

    return {
      edgeLength,
      geometry,
      idleStickers,
      materials,
      stickerPosition,
      turningStickers,
      turnRotation,
    };
  },
  components: {
    VCore,
  },
  props: {
    config: {
      required: true,
      type: Object as PropType<Partial<CubeConfig>>,
    },
    currentTurn: {
      default: '',
      type: String,
    },
    model: {
      required: true,
      type: Object as PropType<Cube>,
    },
    turnProgress: {
      default: 0,
      type: Number,
    },
  },
});
</script>
