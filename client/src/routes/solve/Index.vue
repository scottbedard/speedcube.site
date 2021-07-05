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
    :puzzle="puzzle"
    :scrambling="scrambling"
    @scramble="scramble"
    @turn="turn" />

  <RouterView v-else />
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, ref } from 'vue'
import { Puzzle } from '@/components'
import { puzzleConfig } from '@/app/store/computed'
import { timeout } from '@/app/utils'
import { useCreateSolve } from '@/app/api'
import { usePuzzle } from '@/app/behaviors'
import { useRoute } from 'vue-router'
import Gameplay from '@/partials/solve/Gameplay.vue'

export default defineComponent({
  setup() {
    const { createSolve, pendingSolve } = useCreateSolve()

    const route = useRoute()

    const isIndex = computed(() => route.name === 'solve')

    // raw puzzle name
    const puzzle = computed(() => route.params.puzzle as string)

    // puzzle config
    const config = computed(() => puzzleConfig.value(puzzle))

    const masked = ref(false)

    // twister controls
    const {
      currentTurn,
      model,
      puzzleName,
      scrambling,
      turnIndex,
      turnProgress,
      turns,
    } = usePuzzle({
      config,
      onScramblingEnd,
      puzzle,
    })

    // unmask the puzzle when scrambling ends
    function onScramblingEnd() {
      masked.value = false
    }

    // scramble the puzzle
    function scramble() {
      if (!scrambling.value) {
        masked.value = true
        scrambling.value = true

        Promise.all([
          createSolve({ puzzle: puzzleName.value }),
          timeout(2000),
        ]).then(() => {
          model.value.apply(pendingSolve.value.state)

          scrambling.value = false
        })
      }
    }

    // turn
    function turn(turn: string) {
      turns.value.push(turn)
    }

    return {
      config,
      currentTurn,
      isIndex,
      masked,
      model,
      puzzle,
      route,
      scramble,
      scrambling,
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
