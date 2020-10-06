<template>
  <div
    class="border-4 border-dashed border-blue-500"
    ref="el">
    <slot />
    <div v-if="square" class="pb-full" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, onUnmounted, PropType, ref } from 'vue';
import { RendererSymbol, SceneApi } from '@/components/three/types';
import { Object3D, Scene } from 'three';
import { stubArray } from 'lodash-es';
import { useNestable } from '@/app/three/utils/nestable';
import { usePerspectiveCamera } from '@/app/three/cameras/perspective-camera';

export default defineComponent({
  setup(props) {
    const el = ref<HTMLElement>();
    const renderer = inject(RendererSymbol);

    // scene
    const scene = new Scene();

    useNestable(scene, props.children);

    // camera
    const camera = usePerspectiveCamera({
      cameraAngle: computed(() => props.cameraAngle || 0),
      cameraAspect: props.cameraAspect,
      cameraDistance: computed(() => props.cameraDistance || 0),
      cameraFar: props.cameraFar,
      cameraFov: props.cameraFov,
      cameraNear: props.cameraNear,
    });

    const sceneFn = (): SceneApi => {
      return {
        camera,
        el: el.value,
        scene,
      }
    };

    if (renderer) {
      onMounted(() => {
        renderer.addScene(sceneFn);
      });

      onUnmounted(() => {
        renderer.removeScene(sceneFn);
      });
    }

    return {
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
      default: 0,
      type: Number,
    },
    children: {
      default: stubArray,
      type: Array as PropType<Object3D[]>,
    },
    square: {
      default: false,
      type: Boolean,
    },
  },
});
</script>