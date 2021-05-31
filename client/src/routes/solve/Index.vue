<template>
  <div class="max-w-sm mb-6 mx-auto">
    <Puzzle
      :class="{
        'border-2 border-dashed border-gray-400 dark:border-gray-700': route.name === 'solve:config'
      }"
      :config="config"
      :current-turn="currentTurn"
      :masked="masked"
      :model="model"
      :turn-progress="turnProgress" />
  </div>

  <Gameplay
    v-if="isIndex"
    @scramble="scramble" />

  <RouterView v-else />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { createModel, normalizePuzzleName } from '@/app/utils'
import { cubeConfig } from '@/components/puzzle/constants'
import { keyboardConfig, puzzleConfig } from '@/app/store/computed'
import { Puzzle } from '@/components'
import { useCreateSolve } from '@/app/api'
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
    
    const masked = ref(false)

    const {
      createSolve,
      pendingSolve,
    } = useCreateSolve()

    const {
      currentTurn,
      turnProgress,
    } = usePuzzleTurning(model, config, keybindings)
    
    // scramble the puzzle
    const scramble = () => {
      masked.value = true

      createSolve({ puzzle }).then(() => {
        model.apply(pendingSolve.value.state as any) // @todo
      }).finally(() => {
        masked.value = false
      })
    }

    return {
      config,
      cubeConfig,
      currentTurn,
      isIndex,
      masked,
      model,
      puzzle,
      route,
      scramble,
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
