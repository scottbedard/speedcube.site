<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<template>
  <div>
    <renderer>
      <router-view />
    </renderer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Renderer from '@/components/three/renderer/Renderer.vue';

export default defineComponent({
  components: {
    Renderer,
  },
});
</script>
