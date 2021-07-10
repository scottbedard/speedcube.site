import { clamp, isNumber, noop } from 'lodash-es'
import { computed, ref, unref, watch } from 'vue'
import { createModel, normalizePuzzleName } from '@/app/utils'
import { defaultTurnDuration } from '@/components/puzzle/constants'
import { MaybeRef, useTransition } from '@vueuse/core'

export type UsePuzzleOptions = {
  config?: MaybeRef<Record<string, unknown>>,
  onScramblingEnd?: () => void,
  onTurnEnd?: () => void,
  onTurnStart?: () => void,
  puzzle: MaybeRef<string>,
}

type Turn = {
  apply: boolean,
  notation: string,
}

/**
 * Controls needed to interact with the puzzle component.
 */
export function usePuzzle(options: UsePuzzleOptions) {
  const {
    config,
    onScramblingEnd = noop,
    onTurnEnd = noop,
    onTurnStart = noop,
    puzzle,
  } = options

  // normalized puzzle name
  const puzzleName = computed(() => normalizePuzzleName(unref(puzzle)))

  // twister instance
  const model = ref(createModel(puzzleName.value))

  // flag to toggle scrambling logic
  const scrambling = ref(false)

  const turns = ref<Turn[]>([])

  const turnIndex = ref(-1)

  const turning = ref(false)

  const turnTransition = useTransition(turnIndex, {
    duration: computed(() => {
      const n = unref(config ?? {})?.turnDuration;
      return isNumber(n) ? n : defaultTurnDuration;
    }),
    onFinished() {
      onTurnComplete(data, onTurnStart, onTurnEnd)

      if (!scrambling.value) {
        onScramblingEnd()
      }
    }
  })

  // the current turn being animated
  const currentTurn = computed(() => {
    return turning.value && turns.value[turnIndex.value] 
      ? turns.value[turnIndex.value]
      : { apply: false, notation: '' }
  })

  // current turn progress
  const turnProgress = computed(() => turning.value ? 1 - clamp(turnIndex.value - turnTransition.value, 0, 1) : 0)

  /**
   * Queue a turn for execution.
   */
  const turn = (notation: string, apply: boolean = true) => {
    turns.value.push({ notation, apply })
  }

  // group behavior data together so it can be safely destructured
  const data = {
    currentTurn,
    model,
    puzzleName,
    scrambling,
    turn,
    turnIndex,
    turning,
    turnProgress,
    turns,
  }

  watch(scrambling, () => onScramblingChanged(data))

  watch(turns, () => onTurnsChanged(data, onTurnStart), { deep: true })

  return data;
}

/**
 * Advance to the next turn
 */
function advanceNextTurn(data: ReturnType<typeof usePuzzle>, onTurnStart: () => void) {
  const { scrambling, turning, turnIndex } = data

  turning.value = true
  turnIndex.value += 1

  if (!scrambling.value) {
    onTurnStart()
  }
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
function onTurnsChanged(data: ReturnType<typeof usePuzzle>, onTurnStart: () => void) {
  const { turning } = data
  
  if (!turning.value) {
    advanceNextTurn(data, onTurnStart)
  }
}

/**
 * Handle completion of a turn
 */
function onTurnComplete(data: ReturnType<typeof usePuzzle>, onTurnStart: () => void, onTurnEnd: () => void) {
  const { currentTurn, model, scrambling, turning, turns, turnIndex } = data

  if (scrambling.value) {
    generateRandomTurn(data)
  } else {
    const { apply, notation } = currentTurn.value

    if (apply) {
      model.value.turn(notation)
    }
+
    onTurnEnd()
  }

  if (turnIndex.value < turns.value.length - 1) {
    advanceNextTurn(data, onTurnStart)
  } else {
    turning.value = false
  }
}

/**
 * Queue a random turn to simulate scrambling.
 */
function generateRandomTurn(data: ReturnType<typeof usePuzzle>) {
  const { currentTurn, model, turn } = data

  turn(model.value.generateScramble(1, currentTurn.value.notation), false)
}
