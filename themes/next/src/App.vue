<style>
/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */
@tailwind utilities;
</style>

<template>
  <div>
    <renderer />
    <router-view />

    <div>
      <div v-for="n in 1000" :key="n">
        Hello world: {{ n }}
      </div>
    </div>
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
