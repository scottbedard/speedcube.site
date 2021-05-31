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

  <Gameplay v-if="isIndex" />

  <RouterView v-else />
</template>

<script lang="ts">
import { Puzzle } from '@/components'
import { computed, defineComponent } from 'vue'
import { createModel, normalizePuzzleName } from '@/app/utils'
import { cubeConfig } from '@/components/puzzle/constants'
import { keyboardConfig, puzzleConfig } from '@/app/store/computed'
import { usePuzzleTurning } from '@/app/behaviors'
import { useRoute } from 'vue-router'
import Gameplay from '@/partials/solve/Gameplay.vue'

export default defineComponent({
  setup() {
    const route = useRoute()

    const isIndex = computed(() => route.name === 'solve')

    const puzzle = normalizePuzzleName(route.params?.puzzle as string)

    const model = createModel(puzzle)

    const config = computed(() => puzzleConfig.value(puzzle))

    const keybindings = computed(() => keyboardConfig.value(puzzle))

    const {
      currentTurn,
      turnProgress,
    } = usePuzzleTurning(model, config, keybindings)

    return {
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
    Gameplay,
    Puzzle,
  },
  name: 'SolveIndex'
})
</script>
