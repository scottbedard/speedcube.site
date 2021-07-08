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
    v-if="isIndex"
    :puzzle="puzzle"
    :scrambling="scrambling"
    :status="status"
    @scramble="scramble"
    @start="start"
    @turn="turn" />

  <RouterView v-else />
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, ref } from 'vue'
import { Puzzle } from '@/components'
import { keyboardConfig, puzzleConfig } from '@/app/store/computed'
import { timeout } from '@/app/utils'
import { useCreateSolve } from '@/app/api'
import { usePuzzle, useSolving } from '@/app/behaviors'
import { useRoute } from 'vue-router'
import Gameplay from '@/partials/solve/Gameplay.vue'

export type Status = 'idle' | 'scrambling' | 'inspecting' | 'solving'

export default defineComponent({
  setup() {
    // route info, only permit gameplay on index
    const route = useRoute()
    const isIndex = computed(() => route.name === 'solve')

    // puzzle and keybinding configs
    const puzzle = computed(() => route.params.puzzle as string)
    const config = computed(() => puzzleConfig.value(puzzle))
    const keybindings = computed(() => keyboardConfig.value(puzzle))

    // solving behavior
    const {
      currentTurn,
      model,
      turnProgress,
    } = useSolving({
      config,
      keybindings,
      puzzle,
    })

    //
    // EVERYTHING BELOW THIS LINE IS OBSOLETE AND IS BEING
    // ABSTRACTED TO SOLVING BEHAVIOR.
    //
    const { createSolve, pendingSolve } = useCreateSolve()

    // solve status
    const status = ref<Status>('idle')

    // twister controls
    const {
      // currentTurn,
      // model,
      puzzleName,
      scrambling,
      turnIndex,
      // turnProgress,
      turns,
    } = usePuzzle({
      config,
      onScramblingEnd,
      puzzle,
    })

    // unmask the puzzle when scrambling ends
    function onScramblingEnd() {
      status.value = 'inspecting'
    }

    // scramble the puzzle
    function scramble() {
      if (!scrambling.value) {
        scrambling.value = true
        status.value = 'scrambling'

        Promise.all([
          createSolve({ puzzle: puzzleName.value }),
          timeout(2000),
        ]).then(() => {
          model.value.apply(pendingSolve.value.state)

          scrambling.value = false
        })
      }
    }

    function start() {
      console.log('start')
    }

    // turn
    function turn(turn: string) {
      turns.value.push(turn)
    }

    return {
      config,
      currentTurn,
      isIndex,
      model,
      puzzle,
      route,
      scramble,
      scrambling,
      start,
      status,
      turn,
      turnIndex,
      turnProgress,
      turns,
    }
  },
  components: {
    Gameplay,
    Puzzle,
  },
  name: 'SolveIndex'
})
</script>
