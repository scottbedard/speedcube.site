<template>
  <canvas
    class="absolute border-4 border-red-500 h-full left-0 pointer-events-none top-0 w-full z-10"
    ref="canvas"
    :style="{
      transform: `translateY(${scrollY}px)`,
    }"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { useWindowScroll } from '@vueuse/core';
import { useDisposable } from '@/app/three';
import { WebGLRenderer } from 'three';

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>();
    const { y: scrollY } = useWindowScroll();

    let renderer: WebGLRenderer;

    onMounted(() => {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas.value,
      });
    });

    useDisposable(() => renderer);

    return {
      canvas,
      scrollY,
    };
  },
});
</script>
