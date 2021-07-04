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

    <pre class="text-sm">{{ { currentTurn, scrambling, turnIndex, turnProgress } }}</pre>
  </div>

  <Gameplay
    v-if="isIndex"
    @scramble="scramble" />

  <RouterView v-else />
</template>

<script lang="ts">
/* eslint-disable */
import { computed, defineComponent, ref } from 'vue'
import { keyboardConfig, puzzleConfig } from '@/app/store/computed'
import { Puzzle } from '@/components'
import { timeout } from '@/app/utils'
import { useCreateSolve } from '@/app/api'
import { useKeybindings, usePuzzle } from '@/app/behaviors'
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

    // keyboard config
    const keybindings = computed(() => keyboardConfig.value(puzzle))

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
      keybindings,
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

    useKeybindings(keybindings, keybinding => {
      if (!scrambling.value) {
        turns.value.push(keybinding.turn)
      }
    })

    return {
      config,
      currentTurn,
      isIndex,
      masked,
      model,
      route,
      scramble,
      scrambling,
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
