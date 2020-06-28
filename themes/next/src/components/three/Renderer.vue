<template>
  <div>
    <canvas
      class="absolute border-4 border-red-500 h-full left-0 pointer-events-none top-0 w-full z-10"
      ref="canvas"
      :style="{
        transform: `translateY(${scrollY}px)`,
      }"
    />
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, onMounted, provide, ref,
} from '@vue/composition-api';
import { useDisposable } from '@/app/three';
import { useWindowScroll } from '@vueuse/core';
import { WebGLRenderer } from 'three';
import { RendererSymbol } from './types';

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

    provide(RendererSymbol, {
      addScene() {
        console.log('adding scene');
      },
      removeScene() {
        console.log('removing scene');
      },
    });

    useDisposable(() => renderer);

    return {
      canvas,
      scrollY,
    };
  },
});
</script>
