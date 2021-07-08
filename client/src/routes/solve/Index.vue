<template>
  <div class="max-w-sm mb-6 mx-auto">
    <Puzzle
      :class="{
        'border-2 border-dashed border-gray-400 dark:border-gray-700': route.name === 'solve:config'
      }"
      :config="config"
      :current-turn="currentTurn"
      :masked="status === 'scrambling'"
      :model="model"
      :turn-progress="turnProgress" />
  </div>

  <Gameplay
    v-if="index"
    :status="status"
    @scramble="scramble" />

  <RouterView v-else />
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent } from 'vue'
import { keyboardConfig, puzzleConfig } from '@/app/store/computed'
import { Puzzle } from '@/components'
import { useRoute } from 'vue-router'
import { useSolving } from '@/app/behaviors'
import Gameplay from '@/partials/solve/Gameplay.vue'

export default defineComponent({
  setup() {
    // route info, only permit gameplay on index
    const route = useRoute()
    const index = computed(() => route.name === 'solve')

    // puzzle and keybinding configs
    const puzzle = computed(() => route.params.puzzle as string)
    const config = computed(() => puzzleConfig.value(puzzle))
    const keybindings = computed(() => keyboardConfig.value(puzzle))

    // solving behavior
    const {
      currentTurn,
      model,
      scramble,
      status,
      turnProgress,
    } = useSolving({
      config,
      keybindings,
      puzzle,
    })

    return {
      config,
      currentTurn,
      index,
      model,
      route,
      scramble,
      status,
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
