<template>
  <div class="max-w-sm mb-6 mx-auto">
    <Puzzle
      :class="{
        'border-2 border-dashed border-gray-400 dark:border-gray-700': route.name === 'solve:config'
      }"
      :config="config"
      :current-turn="currentTurn.notation"
      :masked="scrambling"
      :model="model"
      :turn-progress="turnProgress" />
  </div>

  <div
    v-if="index"
    class="flex justify-center">
    <GameplayIdle
      v-if="status === 'idle'"
      @scramble="scramble" />

    <GameplaySolving
      v-else-if="
        status === 'inspection' ||
        status === 'solving' ||
        status === 'dnf' ||
        status === 'complete'
      "
      :idle-time="idleTime"
      :inspection-time="inspectionTime"
      :loading="completeSolveLoading"
      :solve-time="solveTime"
      :solve="solve"
      :status="status" />
  </div>

  <RouterView v-else />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { keyboardConfig, puzzleConfig } from '@/app/store/computed'
import { Puzzle } from '@/components'
import { useRoute } from 'vue-router'
import { useSolving } from '@/app/behaviors'
import GameplayIdle from '@/partials/solve/GameplayIdle.vue'
import GameplaySolving from '@/partials/solve/GameplaySolving.vue'

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
      completeSolveLoading,
      currentTurn,
      idleTime,
      inspectionTime,
      model,
      scramble,
      scrambling,
      solve,
      solveTime,
      status,
      turnProgress,
    } = useSolving({
      config,
      keybindings,
      puzzle,
      ready: index,
    })

    return {
      completeSolveLoading,
      config,
      currentTurn,
      idleTime,
      index,
      inspectionTime,
      model,
      route,
      scramble,
      scrambling,
      solve,
      solveTime,
      status,
      turnProgress,
    }
  },
  components: {
    GameplayIdle,
    GameplaySolving,
    Puzzle,
  },
  name: 'SolveIndex'
})
</script>
