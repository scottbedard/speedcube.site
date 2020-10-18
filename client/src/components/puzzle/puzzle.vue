<template>
  <v-scene
    square
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance">
    <v-ambient-light />

    <component
      :config="config"
      :is="puzzle"
      :model="model" />
  </v-scene>
</template>

<script lang="ts">
import { Cube } from '@bedard/twister';
import { defineComponent, PropType } from 'vue';
import { isNumber, stubObject } from 'lodash-es';
import VAmbientLight from '@/components/three/lights/ambient-light.vue';
import VCube from '@/components/puzzle/cube/cube.vue';
import VScene from '@/components/three/scene.vue';

export default defineComponent({
  components: {
    VAmbientLight,
    VScene,
  },
  computed: {
    cameraAngle(): number {
      const cameraAngle = this.config.cameraAngle;
      return isNumber(cameraAngle) ? cameraAngle : 25;
    },
    cameraDistance(): number {
      const cameraDistance = this.config.cameraDistance;
      return isNumber(cameraDistance) ? cameraDistance : 3;
    },
    puzzle() {
      if (this.model instanceof Cube) {
        return VCube;
      }

      throw 'Puzzle not implemented';
    },
  },
  props: {
    config: {
      default: stubObject,
      type: Object as PropType<Record<string, unknown>>,
    },
    model: {
      required: true,
      type: Object as PropType<Cube>,
    },
  },
});
</script>
