import { 
  computed,
  ComputedRef,
  ref,
  Ref,
  unref,
  watch,
} from 'vue'

import { clamp, isNumber, noop } from 'lodash-es'
import { createModel, normalizePuzzleName } from '@/app/utils'
import { Cube } from '@bedard/twister'
import { defaultTurnDuration } from '@/components/puzzle/constants'
import { MaybeRef, useTransition } from '@vueuse/core'
import { PuzzleName } from '@/app/types/puzzle'

export type UsePuzzleOptions = {
  config?: MaybeRef<Record<string, unknown>>,
  keybindings?: MaybeRef<Record<string, string>>,
  onScramblingEnd?: () => void,
  puzzle: MaybeRef<string>,
}

/**
 * Controls needed to interact with the puzzle component.
 */
export function usePuzzle(options: UsePuzzleOptions) {
  const {
    config,
    puzzle,
    onScramblingEnd = noop
  } = options

  // normalized puzzle name
  const puzzleName = computed(() => normalizePuzzleName(unref(puzzle)))

  // twister instance
  const model = computed(() => createModel(puzzleName.value))

  // flag to toggle scrambling logic
  const scrambling = ref(false)

  const turns = ref<string[]>([])

  const turnIndex = ref(-1)

  const turning = ref(false)

  const turnTransition = useTransition(turnIndex, {
    duration: computed(() => {
      const n = unref(config ?? {})?.turnDuration;
      return isNumber(n) ? n : defaultTurnDuration;
    }),
    onFinished() {
      onTurnComplete(data)

      if (!scrambling.value) {
        onScramblingEnd()
      }
    }
  })

  // the current turn being animated
  const currentTurn = computed(() => turning.value && turns.value[turnIndex.value] || '')

  // current turn progress
  const turnProgress = computed(() => turning.value ? 1 - clamp(turnIndex.value - turnTransition.value, 0, 1) : 0)

  // group behavior data together so it can be safely destructured
  const data = {
    currentTurn,
    model,
    puzzleName,
    scrambling,
    turnIndex,
    turning,
    turnProgress,
    turns,
  }

  watch(scrambling, () => onScramblingChanged(data))
  watch(turns, () => onTurnsChanged(data), { deep: true })

  return data;
}

/**
 * Advance to the next turn
 */
function advanceNextTurn(data: ReturnType<typeof usePuzzle>) {
  const { turning, turnIndex } = data

  turning.value = true
  turnIndex.value += 1
}

/**
 * Handle change of scrambling flag
 */
function onScramblingChanged(data: ReturnType<typeof usePuzzle>) {
  const { scrambling } = data

  if (scrambling.value) {
    generateRandomTurn(data)
  }
}

/**
 * Handle change of turns array
 */
function onTurnsChanged(data: ReturnType<typeof usePuzzle>) {
  const { turning } = data
  
  if (!turning.value) {
    advanceNextTurn(data)
  }
}

/**
 * Handle completion of a turn
 */
function onTurnComplete(data: ReturnType<typeof usePuzzle>) {
  const { currentTurn, model, scrambling, turning, turns, turnIndex } = data

  if (scrambling.value) {
    generateRandomTurn(data)
  } else {
    model.value.turn(currentTurn.value)
  }

  if (turnIndex.value < turns.value.length - 1) {
    advanceNextTurn(data)
  } else {
    turning.value = false
  }
}

/**
 * Queue a random turn to simulate scrambling.
 */
function generateRandomTurn(data: ReturnType<typeof usePuzzle>) {
  const { currentTurn, model, turns } = data

  turns.value.push(model.value.generateScramble(1, currentTurn.value))
}
