<template>
  <div class="border-4 border-blue-500 w-full" ref="container">
    <div v-if="square" class="pb-full" />
    <slot />
  </div>
</template>

<script lang="ts">
import { stubArray } from 'lodash-es';
import { PerspectiveCamera, Scene } from 'three';
import {
  defineComponent, inject, onMounted, onUnmounted, ref, watch, watchEffect,
} from '@vue/composition-api';
import { useElementVisibility } from '@vueuse/core';
import { useDisposable, useNestable } from '@/app/three';
import { degreesToRadians } from '@/app/utils/math';
import { RendererSymbol } from './types';

export default defineComponent({
  setup(props) {
    const container = ref<Element>();

    // camera
    const camera = new PerspectiveCamera(
      props.cameraFov,
      props.cameraAspect,
      props.cameraNear,
      props.cameraFar,
    );

    watchEffect(() => {
      const angle = degreesToRadians(props.cameraAngle);
      const adjacent = Math.sin(angle) * props.cameraDistance;
      const opposite = Math.cos(angle) * props.cameraDistance;

      camera.position.set(0, opposite, adjacent);
      camera.lookAt(0, 0, 0);
    });

    // scene
    const scene = new Scene();
    scene.userData.camera = camera;

    useNestable(scene, () => props.children);
    useDisposable(scene);

    // renderer
    const renderer = inject(RendererSymbol);

    if (renderer) {
      onMounted(() => {
        scene.userData.el = container.value;
      });

      onUnmounted(() => {
        renderer.removeScene(scene);
      });

      // add scene to renderer when container is visible
      // @ts-ignore
      watch(useElementVisibility(container), (visible) => (
        visible
          ? renderer.addScene(scene)
          : renderer.removeScene(scene)
      ));
    }

    return {
      container,
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
      default: 100,
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
      default: 1,
      type: Number,
    },
    children: {
      default: stubArray,
      type: Array,
    },
    square: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
