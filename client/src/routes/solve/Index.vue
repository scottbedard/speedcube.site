<template>
  <div class="max-w-sm mb-6 mx-auto">
    <Puzzle
      :class="{
        'border-2 border-dashed border-gray-400 dark:border-gray-700': route.name === 'solve:config'
      }"
      :config="config"
      :current-turn="currentTurn"
      :model="model"
      :turn-progress="turnProgress" />
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

  <RouterView v-else />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { createModel, normalizePuzzleName } from '@/app/utils'
import { cubeConfig } from '@/components/puzzle/constants'
import { Icon, Puzzle } from '@/components'
import { keyboardConfig, puzzleConfig } from '@/app/store/computed'
import { usePuzzleTurning } from '@/app/behaviors'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const cameraAngle = ref(25)

    const cameraDistance = ref(3)

    const route = useRoute()

    const isIndex = computed(() => route.name === 'solve')

    const puzzle = normalizePuzzleName(route.params?.puzzle as string)

    const model = createModel(puzzle)

    const config = computed(() => puzzleConfig.value(puzzle))

    const keybindings = computed(() => keyboardConfig.value(puzzle))

    const {
      currentTurn,
      turnProgress,
    } = usePuzzleTurning(model, keybindings)

    return {
      cameraAngle,
      cameraDistance,
      config,
      cubeConfig,
      currentTurn,
      isIndex,
      model,
      route,
      turnProgress,
    }
  },
  components: {
    Icon,
    Puzzle,
  },
  name: 'SolveIndex'
})
</script>
