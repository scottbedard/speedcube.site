<template>
  <div
    class="border-4 border-dashed"
    ref="el">
    <div v-if="square" class="pb-full" />
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watchEffect,
} from 'vue'

import {
  PerspectiveCamera,
  Scene,
} from 'three'

import { clamp } from 'lodash-es'
import { degreesToRadians } from '@/app/utils/math'
import { RendererSymbol, SceneApi } from '@/three/types'
import { useNesting } from '@/three/behaviors'

// @todo: figure out why Number.EPSILON doesn't work for this value
const EPSILON = 0.0001;

export default defineComponent({
  setup(props) {
    // container element
    const el = ref<HTMLElement>()

    // scene
    const scene = new Scene()

    useNesting(scene, true)

    // camera
    const camera = new PerspectiveCamera(
      props.cameraFov, 
      props.cameraAspect, 
      props.cameraNear, 
      props.cameraFar,
    )

    watchEffect(() => {
      const angle = clamp(-props.cameraAngle + 90, 0, 90);
      const distance = clamp(props.cameraDistance, EPSILON, Infinity);
      const radians = degreesToRadians(angle);
      const adjacent = Math.sin(radians) * distance;
      const opposite = Math.cos(radians) * distance;
      camera.position.set(0, opposite, adjacent);
      camera.lookAt(0, 0, 0);
    })

    // register scene with the renderer
    const renderer = inject(RendererSymbol)

    if (renderer) {
      const sceneFn = (): SceneApi => ({ camera, el: el.value, scene });
  
      onMounted(() => renderer.addScene(sceneFn));
      onUnmounted(() => renderer.removeScene(sceneFn));
    }

    return {
      el
    }
  },
  name: 'Scene',
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
    square: {
      type: Boolean,
    },
  },
})
</script>
