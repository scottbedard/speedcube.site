<template>
  <div class="border-4 border-blue-500 w-full" ref="el">
    <slot />
  </div>
</template>

<script lang="ts">
import { Object3D, Scene } from 'three';
import {
  computed, defineComponent, inject, ref, onMounted, onUnmounted,
} from '@vue/composition-api';
import { RendererSymbol } from '@/components/three/types';
import { useNestable } from '@/app/three';
import { usePerspectiveCamera } from '@/app/three/cameras/usePerspectiveCamera';

type SceneProps = {
  cameraAngle?: number;
  cameraAspect?: number;
  cameraDistance?: number;
  cameraFar?: number;
  cameraFov?: number;
  cameraNear?: number;
  children: Object3D;
};

export default defineComponent({
  setup(props: SceneProps) {
    const el = ref<Element>();

    const scene = new Scene();

    const camera = usePerspectiveCamera({
      cameraAngle: computed(() => props.cameraAngle || 0),
      cameraAspect: props.cameraAspect,
      cameraDistance: computed(() => props.cameraDistance || 1),
      cameraFar: props.cameraFar,
      cameraFov: props.cameraFov,
      cameraNear: props.cameraNear,
    });

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
    cameraAngle: Number,
    cameraAspect: Number,
    cameraDistance: Number,
    cameraFar: Number,
    cameraFov: Number,
    cameraNear: Number,
    children: Object3D,
  },
});
</script>
