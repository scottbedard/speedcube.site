<template>
  <div class="max-w-sm mb-6 mx-auto">
    <Puzzle
      :config="config"
      :model="model" />
  </div>

  <div
    v-if="isIndex"
    class="gap-x-10 gap-y-2 flex flex-wrap justify-center">
    <RouterLink
      class="flex items-center"
      :to="{
        name: 'solve:config',
        params: {
          puzzle: route.params.puzzle,
        },
      }">
      <Icon class="mr-1 transform rotate-90" name="sliders" />

      Customize Appearance
    </RouterLink>

    <RouterLink
      class="flex items-center"
      :to="{
        name: 'solve:controls',
        params: {
          puzzle: route.params.puzzle,
        },
      }">
      <Icon class="mr-1" name="hash" />

      Edit Key Bindings
    </RouterLink>
  </div>

  <RouterView v-else/>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Cube } from '@bedard/twister'
import { cubeConfig } from '@/components/puzzle/constants'
import { Icon, Puzzle } from '@/components'
import { normalizePuzzleName } from '@/app/utils'
import { previewPuzzleConfig } from '@/app/store/state'
import { puzzleConfig } from '@/app/store/computed'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const cameraAngle = ref(25)
    const cameraDistance = ref(3)
    const model = new Cube({ size: 3 })
    const route = useRoute()
    const isIndex = computed(() => route.name === 'solve')

    const puzzle = normalizePuzzleName(route.params?.puzzle as string)

    const config = computed(() => {
      if (previewPuzzleConfig.value) {
        return previewPuzzleConfig.value
      }
      
      return puzzleConfig.value(puzzle)
    })

    return {
      cameraAngle,
      cameraDistance,
      config,
      cubeConfig,
      isIndex,
      model,
      route,
    }
  },
  components: {
    Icon,
    Puzzle,
  },
  name: 'SolveIndex'
})
</script>
