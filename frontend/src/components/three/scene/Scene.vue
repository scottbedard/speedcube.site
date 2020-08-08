<template>
  <div class="border-4 border-blue-500" ref="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { stubArray } from 'lodash-es';
import { PerspectiveCamera, Scene } from 'three';
import {
  defineComponent, inject, onMounted, onUnmounted, ref, watch,
} from 'vue';
import { useElementVisibility } from '@vueuse/core';
import { RendererSymbol } from '@/app/constants';
import { SceneData } from '../types';

export default defineComponent({
  setup(props) {
    const container = ref<Element>();

    // create a camera
    const camera = new PerspectiveCamera(
      props.cameraFov,
      props.cameraAspect,
      props.cameraNear,
      props.cameraFar,
    );

    // create a scene and attach our camera to it
    const scene = new Scene();

    scene.userData.camera = camera;

    // register and unregister our scene with the renderer
    // when the containing element becomes visible
    const renderer = inject(RendererSymbol);

    if (renderer) {
      onMounted(() => {
        scene.userData.el = container.value;
      });

      onUnmounted(() => {
        renderer.removeScene(scene);
      });

      watch(useElementVisibility(container), (visible) => {
        if (visible) {
          renderer.addScene(scene);
        } else {
          renderer.removeScene(scene);
        }
      });
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
  },
});
</script>
