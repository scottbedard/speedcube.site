<template>
  <v-scene
    class="w-full"
    square
    :children="children" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAxesHelper } from '@/app/three/utils/axes-helper';
import VScene from '@/components/three/scene.vue';

export default defineComponent({
  setup() {
    const axesHelper = useAxesHelper();

    const children = [
      axesHelper,
    ];

    return {
      children,
    };
  },
  components: {
    VScene,
  },
});
</script>
