<template>
  <slot />
  <canvas
    class="fixed h-full left-0 pointer-events-none top-0 w-full"
    ref="canvas"
    :class="{
      hidden: empty,
    }"
    :data-scenes="scenes.length"
    :height="height"
    :width="width" />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
} from 'vue'
import { RendererSymbol, SceneFactory } from './types'
import { useRafFn, useWindowSize } from '@vueuse/core'
import { WebGLRenderer } from 'three'

// three.js renderer for multiple scenes
// https://threejs.org/examples/webgl_multiple_elements.html

export default defineComponent({
  setup() {
    let renderer: WebGLRenderer

    const canvas = ref<HTMLCanvasElement>()
    const scenes = ref([] as any[])
    const empty = computed(() => scenes.value.length === 0)
    const { height, width } = useWindowSize()

    // raf loop to render scenes
    const rafLoop = useRafFn(() => {
      if (!canvas.value) {
        return
      }

      console.log('render')
    })

    // manage renderer on mounted
    onMounted(() => {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas.value,
      })

      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(window.devicePixelRatio)
    })

    // dispose render on unmounted
    onUnmounted(() => {
      renderer.dispose()
    })

    // add / remove scenes
    provide(RendererSymbol, {
      addScene(sceneFn) {
        scenes.value.push(sceneFn)
      },
      removeScene(sceneFn) {
        scenes.value = scenes.value.filter(fn => fn !== sceneFn)
      },
    })

    // start raf loop only when there are scenes
    watch(empty, () => {
      if (empty.value) {
        rafLoop.pause()
      } else {
        rafLoop.resume()
      }
    }, { immediate: true })

    return {
      canvas,
      empty,
      height,
      scenes,
      width,
    }
  },
  name: 'Renderer',
})
</script>
