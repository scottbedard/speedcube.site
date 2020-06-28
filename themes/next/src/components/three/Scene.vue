<template>
  <div
    class="border-4 border-blue-500 pb-full w-64"
    ref="container">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, onUnmounted, ref, watchEffect,
} from '@vue/composition-api';
import { useElementVisibility } from '@vueuse/core';
import { RendererSymbol } from './types';

export default defineComponent({
  setup() {
    const container = ref<Element>();
    const renderer = inject(RendererSymbol);

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
});
</script>
