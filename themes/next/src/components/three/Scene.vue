<template>
  <div class="border-4 border-blue-500 w-full" ref="el">
    <slot />
  </div>
</template>

<script lang="ts">
import { Object3D, PerspectiveCamera, Scene } from 'three';
import {
  defineComponent, inject, ref, onMounted, onUnmounted,
} from '@vue/composition-api';
import { RendererSymbol } from '@/components/three/types';
import { useNestable } from '@/app/three';

interface Props {
  children: Object3D;
}

export default defineComponent({
  setup(props: Props) {
    const el = ref<Element>();

    const scene = new Scene();

    const camera = new PerspectiveCamera(50, 1, 1, 10);
    camera.position.z = 2;

    const sceneFn = () => ({
      camera,
      el: el.value,
      scene,
    });

    useNestable(scene, props.children);

    const renderer = inject(RendererSymbol);

    if (renderer) {
      onMounted(() => {
        renderer.addScene(sceneFn);
      });

      onUnmounted(() => {
        renderer.removeScene(sceneFn);
      });
    }

    return { el };
  },
  props: {
    children: Object3D,
  },
});
</script>
