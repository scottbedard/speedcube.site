<template>
  <div class="border-4 border-blue-500 w-full" ref="container">
    <div v-if="square" class="pb-full" />
    <slot />
  </div>
</template>

<script lang="ts">
import { Scene } from 'three';
import {
  defineComponent, inject, onUnmounted, ref, watchEffect,
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
      onUnmounted(() => {
        renderer.removeScene();
      });

      watchEffect(() => {
        if (visible.value) {
          renderer.addScene();
        } else {
          renderer.removeScene();
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
