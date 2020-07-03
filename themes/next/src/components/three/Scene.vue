<template>
  <div class="border-4 border-blue-500 w-full" ref="el">
    <slot />
  </div>
</template>

<script lang="ts">
import { Object3D, Scene } from 'three';
import {
  computed, defineComponent, inject, ref, onMounted, onUnmounted, watchEffect,
} from '@vue/composition-api';
import { degreesToRadians } from '@/app/utils/math';
import { RendererSymbol } from '@/components/three/types';
import { useNestable } from '@/app/three';
import { usePerspectiveCamera } from '@/app/three/cameras/usePerspectiveCamera';

/**
 * Props
 */
interface Props {
  cameraAngle?: number;
  cameraAspect?: number;
  cameraDistance?: number;
  cameraFar?: number;
  cameraFov?: number;
  cameraNear?: number;
  children: Object3D;
}

export default defineComponent({
  setup(props: Props) {
    const el = ref<Element>();

    const scene = new Scene();

    const camera = usePerspectiveCamera({
      cameraAngle: computed(() => props.cameraAngle),
      cameraAspect: computed(() => props.cameraAspect),
      cameraDistance: computed(() => props.cameraDistance),
      cameraFar: computed(() => props.cameraFar),
      cameraFov: computed(() => props.cameraFov),
      cameraNear: computed(() => props.cameraNear),
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
      default: 1,
      type: Number,
    },
    cameraFar: {
      default: 10,
      type: Number,
    },
    cameraFov: {
      default: 60,
      type: Number,
    },
    cameraNear: {
      default: 1,
      type: Number,
    },
    children: Object3D,
  },
});
</script>
