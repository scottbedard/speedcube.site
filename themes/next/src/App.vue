<style>
/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */
@tailwind utilities;
</style>

<template>
  <div class="p-12" style="height: 4000px">
    <renderer>
      <router-view />
    </renderer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Renderer from '@/components/three/Renderer.vue';

export default defineComponent({
  components: {
    Renderer,
  },
});
</script>
