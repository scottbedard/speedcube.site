<template>
  <div
    class="border-4 border-dashed"
    ref="el"
    :class="[borderColor]">
    <slot />
    <div v-if="square" class="pb-full" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, onUnmounted, PropType, ref, watchEffect } from 'vue';
import { RendererSymbol, SceneApi } from '@/components/three/types';
import { Object3D, PerspectiveCamera, Scene } from 'three';
import { clamp, stubArray } from 'lodash-es';
import { useNesting } from '@/app/three/behaviors/nesting';
import { degreesToRadians } from '@/app/utils/math';

// @todo: figure out why Number.EPSILON doesn't work for this value
const EPSILON = 0.001;

export default defineComponent({
  setup(props) {
    const el = ref<HTMLElement>();

    // scene
    const scene = new Scene();

    useNesting(scene, true);

    // camera
    const camera = new PerspectiveCamera(props.cameraFov, props.cameraAspect, props.cameraNear, props.cameraFar);

    watchEffect(() => {
      const angle = clamp(-props.cameraAngle + 90, 0, 90);
      const distance = clamp(props.cameraDistance, EPSILON, Infinity);
      const radians = degreesToRadians(angle);
      const adjacent = Math.sin(radians) * distance;
      const opposite = Math.cos(radians) * distance;

      camera.position.set(0, opposite, adjacent);
      camera.lookAt(0, 0, 0);
    });

    // register scene with renderer
    const renderer = inject(RendererSymbol);

    if (renderer) {
      const sceneFn = (): SceneApi => ({ camera, el: el.value, scene });
  
      onMounted(() => renderer.addScene(sceneFn));
      onUnmounted(() => renderer.removeScene(sceneFn));
    }

    // border
    const borderColor = computed(() => {
      return props.border ? 'border-gray-600': 'border-transparent';
    });

    return {
      borderColor,
      el,
    };
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
      default: EPSILON,
      type: Number,
    },
    children: {
      default: stubArray,
      type: Object as PropType<Object3D | Object3D[]>,
    },
    border: {
      default: false,
      type: Boolean,
    },
    square: {
      default: false,
      type: Boolean,
    },
  },
});
</script>