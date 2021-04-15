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
import { computed, defineComponent, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { RendererSymbol, SceneFactory } from '@/three/types'
import { useRafFn, useWindowSize } from '@vueuse/core'
import { WebGLRenderer } from 'three'

// three.js renderer for multiple scenes
// https://threejs.org/examples/webgl_multiple_elements.html
export default defineComponent({
  setup() {
    let renderer: WebGLRenderer

    const canvas = ref<HTMLCanvasElement>()
    const scenes = ref([] as SceneFactory[])
    const empty = computed(() => scenes.value.length === 0)
    const { height, width } = useWindowSize()

    // raf loop to render scenes
    const rafLoop = useRafFn(() => {
      if (!canvas.value) {
        return
      }

      // update renderer size
      if (canvas.value.width !== width.value || canvas.value.height !== height.value) {
        renderer.setSize(width.value, height.value, false)
      }

      // clear previous frame
      renderer.setScissorTest(false)
      renderer.clear()
      renderer.setScissorTest(true)

      scenes.value.forEach(sceneFn => {
        const { camera, el, scene } = sceneFn()

        if (!el) {
          return
        }

        // check if the element off screen
        const rect = el.getBoundingClientRect()

        if (
          rect.bottom < 0 ||
          rect.top > renderer.domElement.clientHeight ||
          rect.right < 0 ||
          rect.left > renderer.domElement.clientWidth
        ) {
          return // it's off screen, skip it
        }

        // set viewport and render scene
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const bottom = renderer.domElement.clientHeight - rect.bottom

        renderer.setViewport(rect.left, bottom, width, height)
        renderer.setScissor(rect.left, bottom, width, height)
        renderer.render(scene, camera)
      })
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
