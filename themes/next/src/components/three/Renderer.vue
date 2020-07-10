<template>
  <div>
    <canvas
      class="border-4 border-red-500 fixed h-screen left-0 pointer-events-none top-0 w-screen z-10"
      ref="canvas" />
    <slot />
  </div>
</template>

<script lang="ts">
import { WebGLRenderer } from 'three';
import {
  defineComponent, onMounted, provide, ref,
} from '@vue/composition-api';
import { useRafFn, useWindowScroll } from '@vueuse/core';
import { RendererSymbol, SceneFactory } from '@/components/three/types';

export default defineComponent({
  setup() {
    let renderer: WebGLRenderer;

    const canvas = ref<HTMLCanvasElement>();
    const scenes = ref<SceneFactory[]>([]);

    provide(RendererSymbol, {
      addScene(scene) {
        scenes.value.push(scene);
      },
      removeScene(scene) {
        scenes.value = scenes.value.filter((fn) => fn !== scene);
      },
    });

    onMounted(() => {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        canvas: canvas.value,
      });

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
    });

    const clear = () => {
      renderer.setScissorTest(false);
      renderer.clear();
      renderer.setScissorTest(true);
    };

    const updateSize = () => {
      if (canvas.value && renderer) {
        const height = canvas.value.clientHeight;
        const width = canvas.value.clientWidth;

        if (canvas.value.width !== width || canvas.value.height !== height) {
          renderer.setSize(width, height, false);
        }
      }
    };

    const animationLoop = useRafFn(() => {
      if (!canvas.value) {
        return;
      }

      updateSize();
      clear();

      scenes.value.forEach((sceneFn) => {
        const { camera, el, scene } = sceneFn();

        if (!el) {
          return;
        }

        const rect = el.getBoundingClientRect();

        // check if it's offscreen. If so skip it
        if (
          rect.bottom < 0
          || rect.top > renderer.domElement.clientHeight
          || rect.right < 0
          || rect.left > renderer.domElement.clientWidth
        ) {
          return; // it's off screen
        }

        // set the viewport
        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        const { left } = rect;
        const bottom = renderer.domElement.clientHeight - rect.bottom;

        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);

        renderer.render(scene, camera);
      });
    });

    return {
      canvas,
      scenes,
    };
  },
});
</script>
