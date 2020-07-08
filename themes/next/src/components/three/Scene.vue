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
import { useNestable } from '@/app/three/useNestable';
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
      cameraDistance: computed(() => props.cameraDistance || 0),
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
    cameraAngle: {
      default: 0,
      type: Number,
    },
    cameraAspect: {
      default: 1,
      type: Number,
    },
    cameraDistance: {
      default: 0,
      type: Number,
    },
    cameraFar: {
      default: 10000,
      type: Number,
    },
    cameraFov: {
      default: 60,
      type: Number,
    },
    cameraNear: {
      default: 0,
      type: Number,
    },
    children: {
      type: Object3D,
    },
  },
});
</script>
