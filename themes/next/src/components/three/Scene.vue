<template>
  <div class="border-4 border-blue-500 w-full" ref="container">
    <div v-if="square" class="pb-full" />
    <slot />
  </div>
</template>

<script lang="ts">
import { PerspectiveCamera, Scene } from 'three';
import {
  defineComponent, inject, onMounted, onUnmounted, ref, watch,
} from '@vue/composition-api';
import { useElementVisibility } from '@vueuse/core';
import { useDisposable } from '@/app/three';
import { RendererSymbol } from './types';

export default defineComponent({
  setup(props) {
    const container = ref<Element>();

    // renderer api
    const renderer = inject(RendererSymbol);

    // camera
    const camera = new PerspectiveCamera(
      props.cameraFov,
      props.cameraAspect,
      props.cameraNear,
      props.cameraFar,
    );

    // scene
    const scene = new Scene();
    scene.userData.camera = camera;
    useDisposable(scene);

    if (renderer) {
      // lifecycle hooks
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
      default: 1,
      type: Number,
    },
    square: {
      default: false,
      type: Boolean,
    },
  },
});
</script>
