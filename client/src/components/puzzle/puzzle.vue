<template>
  <v-scene
    square
    :border="border"
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance">
    <v-ambient-light />

    <component
      :config="normalizedConfig"
      :current-turn="currentTurn"
      :is="puzzle"
      :model="model"
      :turn-progress="turnProgress" />
  </v-scene>
</template>

<script lang="ts">
import { config as userConfig } from '@/app/store/user/getters';
import { Cube, Dodecaminx } from '@bedard/twister';
import { computed, defineComponent, PropType } from 'vue';
import { isNumber } from 'lodash-es';
import VAmbientLight from '@/components/three/lights/ambient-light.vue';
import VCube from '@/components/puzzle/cube/cube.vue';
import VDodecaminx from '@/components/puzzle/dodecaminx/dodecaminx.vue';
import VScene from '@/components/three/scene.vue';

type CameraConfig = {
  cameraAngle: number,
  cameraDistance: number,
}

type NormalizedConfig = CameraConfig & {
  [key: string]: unknown,
}

export default defineComponent({
  setup(props) {
    const cameraAngle = computed(() => {
      const cameraAngle = normalizedConfig.value.cameraAngle;
      return isNumber(cameraAngle) ? cameraAngle : 25;
    });

    const cameraDistance = computed(() => {
      const cameraDistance = normalizedConfig.value.cameraDistance;
      return isNumber(cameraDistance) ? cameraDistance : 3;
    });

    const normalizedConfig = computed<NormalizedConfig>(() => {
      return props.config as NormalizedConfig || userConfig.value(props.type);
    });

    const puzzle = computed(() => {
      if (props.model instanceof Cube) return VCube;
      if (props.model instanceof Dodecaminx) return VDodecaminx;

      throw 'Puzzle not implemented';
    });

    return {
      cameraAngle,
      cameraDistance,
      normalizedConfig,
      puzzle,
    };
  },
  components: {
    VAmbientLight,
    VScene,
  },
  props: {
    border: {
      default: false,
      type: Boolean,
    },
    config: {
      type: Object as PropType<CameraConfig>,
    },
    currentTurn: {
      default: '',
      type: String,
    },
    model: {
      required: true,
      type: Object as PropType<Cube | Dodecaminx>,
    },
    turnProgress: {
      default: 0,
      type: Number,
    },
    type: {
      default: '',
      type: String,
    },
  },
});
</script>
