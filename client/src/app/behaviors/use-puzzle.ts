import { 
  computed,
  ComputedRef,
  ref,
  Ref,
  unref,
  watch,
} from 'vue'

import { clamp, isNumber } from 'lodash-es'
import { createModel, normalizePuzzleName } from '@/app/utils'
import { Cube } from '@bedard/twister'
import { defaultTurnDuration } from '@/components/puzzle/constants'
import { MaybeRef, useTransition } from '@vueuse/core'
import { PuzzleName } from '@/app/types/puzzle'

export type UsePuzzleOptions = {
  config?: MaybeRef<Record<string, unknown>>,
  keybindings?: MaybeRef<Record<string, string>>,
  puzzle: MaybeRef<string>,
}

type UsePuzzleData = {
  clearQueuePending: Ref<boolean>,
  currentTurn: ComputedRef<string>,
  model: ComputedRef<Cube>,
  puzzleName: ComputedRef<PuzzleName>,
  queue: Ref<string[]>,
  scrambling: Ref<boolean>,
  turn: Ref<number>,
  turnProgress: ComputedRef<number>,
  turnTransition: Ref<number>,
}

/**
 * Controls needed to interact with the puzzle component.
 */
export function usePuzzle({ config, puzzle }: UsePuzzleOptions): UsePuzzleData {
  // normalized puzzle name
  const puzzleName = computed(() => normalizePuzzleName(unref(puzzle)))

  // puzzle turn duration
  const turnDuration = computed(() => {
    const value = unref(config ?? {})?.turnDuration;
    return isNumber(value) ? value : defaultTurnDuration;
  });

  // twister instance
  const model = computed(() => createModel(puzzleName.value))

  // flag to toggle scrambling logic
  const scrambling = ref(false)

  // turn queue, and the turn being animated
  const queue = ref<string[]>([])

  const currentTurn = computed(() => queue.value[0] || '')

  // flag to clear the queue when current turn finishes
  const clearQueuePending = ref(false)

  // turn counter and transitioned state that follows it
  const turn = ref(0)

  const turnTransition = useTransition(turn, {
    duration: turnDuration,
    onFinished: () => onTurnComplete(data),
  })

  // current turn progress from 0 to 1
  const turnProgress = computed(() => 1 - clamp(currentTurn.value ? turn.value - turnTransition.value : 1, 0, 1))

  // collection of behavior data that can be safely destructured
  const data: UsePuzzleData = {
    clearQueuePending,
    currentTurn,
    model,
    puzzleName,
    queue,
    scrambling,
    turn,
    turnProgress,
    turnTransition,
  }

  watch(() => queue.value.length, () => {
    onCurrentTurnChange(data)
  })

  watch(scrambling, () => {
    onScramblingChange(data)
  })

  return data;
}

/**
 * Handle change of scrambling flag
 */
function onScramblingChange(data: UsePuzzleData) {
  const { clearQueuePending, scrambling } = data

  // clear the queue if we are no longer scrambling, otherwise
  // set to true indicating that it will need to be cleared
  clearQueuePending.value = !scrambling.value

  // if scrambling, queue random turns to act as a loading state
  if (scrambling.value) {
    queueRandomTurn(data)
  }
}

/**
 * Handle change of current turn value
 */
function onCurrentTurnChange({ currentTurn, model, turn }: UsePuzzleData) {
  if (currentTurn.value) {
    console.log('turn', currentTurn.value)
    
    model.value.turn(currentTurn.value)
    turn.value += 1
  }
}

/**
 * Handle completion of a turn
 */
function onTurnComplete(data: UsePuzzleData) {
  const { clearQueuePending, currentTurn, queue, scrambling } = data

  // cache the turn that was currently made. this lets us generate
  // another random turn that compliments it if still scrambling
  const prevTurn = currentTurn.value;

  // clear the queue if necessary, otherwise advance it by one
  if (clearQueuePending.value) {
    queue.value = queue.value.splice(0, queue.value.length)
  } else {
    queue.value.shift()
  }

  // queue a random turn if still scrambling
  if (queue.value.length === 0 && scrambling.value) {
    queueRandomTurn(data, prevTurn)
  }
}

/**
 * Queue a random turn to simulate scrambling.
 */
function queueRandomTurn({ model, queue }: UsePuzzleData, prevTurn?: string) {
  queue.value.splice(0, queue.value.length, model.value.generateScramble(1, prevTurn))
}
