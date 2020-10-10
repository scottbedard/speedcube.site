<template>
  <v-scene
    class="mb-8 w-full"
    square
    :camera-angle="cameraAngle"
    :camera-distance="cameraDistance"
    :children="cube" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { stubObject } from 'lodash-es';
import { useCube } from './cube';
import VScene from '@/components/three/scene.vue';

export default defineComponent({
  setup(props) {
    const cube = useCube(props.options);

    return {
      cube,
    };
  },
  components: {
    VScene,
  },
  props: {
    cameraDistance: {
      default: 0,
      Number,
    },
    cameraAngle: {
      default: 0,
      type: Number,
    },
    name: {
      required: true,
      type: String as PropType<'cube'>,
    },
    options: {
      default: stubObject,
      type: Object,
    },
  },
});
</script>
