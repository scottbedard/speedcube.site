<template>
  <div class="border-4 border-blue-500 w-full" ref="container">
    <div v-if="square" class="pb-full" />
    <slot />
  </div>
</template>

<script lang="ts">
import { Scene } from 'three';
import {
  defineComponent, inject, onMounted, onUnmounted, ref, watch,
} from '@vue/composition-api';
import { useElementVisibility } from '@vueuse/core';
import { useDisposable } from '@/app/three';
import { RendererSymbol } from './types';

export default defineComponent({
  setup() {
    const container = ref<Element>();

    const renderer = inject(RendererSymbol);

    const scene = new Scene();
    useDisposable(scene);

    // @ts-ignore
    const visible = useElementVisibility(container);

    if (renderer) {
      // lifecycle hooks
      onMounted(() => {
        scene.userData.el = container.value;
      });

      onUnmounted(() => {
        renderer.removeScene(scene);
      });

      // add and remove scene
      watch(visible, () => {
        if (visible.value) {
          renderer.addScene(scene);
        } else {
          renderer.removeScene(scene);
        }
      });
    }

    return {
      container,
      visible,
    };
  },
  props: {
    square: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
