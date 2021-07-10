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

    <GameplayInspection
      v-else-if="status === 'inspection'"
      :inspection-time="inspectionTime" />

    <GameplayDnf
      v-else-if="status === 'dnf'" />

    <GameplaySolving
      v-else-if="status === 'solving' || status === 'complete'"
      :solve-time="solveTime"
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
import GameplayDnf from '@/partials/solve/GameplayDnf.vue'
import GameplayIdle from '@/partials/solve/GameplayIdle.vue'
import GameplayInspection from '@/partials/solve/GameplayInspection.vue'
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
      currentTurn,
      inspectionTime,
      model,
      scramble,
      scrambling,
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
      config,
      currentTurn,
      index,
      inspectionTime,
      model,
      route,
      scramble,
      scrambling,
      solveTime,
      status,
      turnProgress,
    }
  },
  components: {
    GameplayDnf,
    GameplayIdle,
    GameplayInspection,
    GameplaySolving,
    Puzzle,
  },
  name: 'SolveIndex'
})
</script>
