<template>
  <div>
    <canvas
      class="absolute border-4 border-red-500 h-full left-0 pointer-events-none top-0 w-full z-10"
      ref="canvas"
      :class="{
        hidden: empty,
      }"
      :height="windowHeight"
      :style="{
        transform: `translateY(${scrollY}px)`,
      }"
      :width="windowWidth"
    />
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, provide, ref, watch,
} from 'vue';
import { Scene, WebGLRenderer } from 'three';
import { useRafFn, useWindowScroll, useWindowSize } from '@vueuse/core';
import { RendererSymbol } from '@/app/constants';
import { SceneData } from '../types';

const defaultRect = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};

export default defineComponent({
  setup() {
    let renderer: WebGLRenderer;

    const { height: windowHeight, width: windowWidth } = useWindowSize();
    const { y: scrollY } = useWindowScroll();
    const canvas = ref<HTMLCanvasElement>();
    const scenes = ref<Scene[]>([]);

    // empty state
    const empty = computed(() => scenes.value.length === 0);

    // mounted
    onMounted(() => {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas.value,
      });

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
    });

    // raf loop
    const { start, stop } = useRafFn(() => {
      if (!renderer || !canvas.value) {
        return;
      }

      // update size
      const canvasHeight = canvas.value.clientHeight;
      const canvasWidth = canvas.value.clientWidth;

      if (canvas.value.width !== canvasWidth || canvas.value.height !== canvasHeight) {
        renderer.setSize(canvasWidth, canvasHeight, false);
      }

      // clear
      renderer.setScissorTest(false);
      renderer.clear();
      renderer.setScissorTest(true);

      // render scenes
      scenes.value.forEach((scene) => {
        const { el } = scene.userData as SceneData;

        // set the viewport
        const rect = el.getBoundingClientRect() || defaultRect;
        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        const bottom = document.body.clientHeight - rect.bottom;

        renderer.setViewport(rect.left, bottom, width, height);
        renderer.setScissor(rect.left, bottom, width, height);

        // render the scene
        renderer.render(scene, scene.userData.camera);
      });
    });

    // start / stop the animation loop
    watch(empty, (newEmpty) => (newEmpty ? stop() : start()));

    // expose renderer api to child components
    provide(RendererSymbol, {
      addScene() {
        // scenes.value.push(scene);
      },
      removeScene() {
        // scenes.value = scenes.value.filter(obj => obj !== scene);
      },
    });

    return {
      canvas,
      empty,
      scrollY,
      windowHeight,
      windowWidth,
    };
  },
});
</script>
