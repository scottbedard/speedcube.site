<template>
  <div>
    <canvas
      class="absolute border-4 border-red-500 h-full left-0 pointer-events-none top-0 w-full z-10"
      ref="canvas"
      :class="{
        hidden: empty,
      }"
      :style="{
        transform: `translateY(${scrollY}px)`,
      }"
    />
    <slot />
    <pre>empty: {{ empty }}</pre>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import {
  computed, defineComponent, onMounted, provide, ref, watch,
} from '@vue/composition-api';
import { useDisposable } from '@/app/three';
import { useRafFn, useWindowScroll } from '@vueuse/core';
import { Scene, WebGLRenderer } from 'three';
import { RendererSymbol } from './types';

export default defineComponent({
  setup() {
    // non-reactive data
    let renderer: WebGLRenderer;
    useDisposable(() => renderer);

    // reactive data
    const { y: scrollY } = useWindowScroll();
    const canvas = ref<HTMLCanvasElement>();
    const scenes = ref<Scene[]>([]);

    // computed data
    const empty = computed(() => scenes.value.length === 0);

    // lifecycle hooks
    onMounted(() => {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas.value,
      });
    });

    // renderer api
    provide(RendererSymbol, {
      addScene(scene) {
        scenes.value.push(scene);
      },
      removeScene(scene) {
        scenes.value = scenes.value.filter(obj => obj !== scene);
      },
    });

    // request animation frame loop
    const { start, stop } = useRafFn(() => {
      scenes.value
        .filter(scene => scene.userData.el instanceof Element)
        .forEach(scene => {
          const el: Element = scene.userData.el;
          const rect = el.getBoundingClientRect();

          // set the viewport
          const width = rect.right - rect.left;
          const height = rect.bottom - rect.top;
          const bottom = document.body.clientHeight - rect.bottom;

          renderer.setViewport(rect.left, bottom, width, height);
          renderer.setScissor(rect.left, bottom, width, height);

          // @todo: raycasting

          // render the scene
          renderer.render(scene, scene.userData.camera);
        });
    });

    watch(empty, (newEmpty) => newEmpty ? stop() : start());

    return {
      canvas,
      empty,
      scrollY,
    };
  },
});
</script>
