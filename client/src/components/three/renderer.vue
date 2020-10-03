<template>
  <canvas
    class="absolute border-4 border-dashed border-red-500 h-full left-0 pointer-events-none top-0 w-full"
    :height="height"
    :style="{ 
      transform: `translateY(${y}px)`, 
    }"
    :width="width" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWindowScroll, useWindowSize } from '@vueuse/core'

// https://threejs.org/examples/webgl_multiple_elements.html

export default defineComponent({
  setup() {
    const { height, width } = useWindowSize();
    const { y } = useWindowScroll();

    return {
      height,
      width,
      y,
    };
  },
});
</script>
