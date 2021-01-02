import { computed, nextTick, ref, unref, watch } from 'vue';
import { identity as linear } from 'lodash-es';
import { MaybeRef } from '@/types/vue';
import { Cube, Dodecaminx } from '@bedard/twister';
import { useTransition } from '@vueuse/core'

/**
 * A turn in the queue. This is stored as an object
 * so that we can watch the array head and respond to
 * changes. If this were just the string, sequential
 * identical turns would not be detected.
 */
type QueuedTurn = {
  turn: string
}

/**
 * Behavior options
 */
type PuzzleControllerOptions = {
  disabled?: MaybeRef<boolean>,
  duration: MaybeRef<number>,
  puzzle: Cube | Dodecaminx,
}

// dev, remove this when vueuse is upgraded
const tempDuration = 80;

/**
 * Manage a puzzle's current turn and turn progress
 */
export function usePuzzleController(options: PuzzleControllerOptions) {
  // advance to the next turn
  const advanceNextTurn = async () => {
    const currentTurn = queue.value[0];

    isTurning.value = false;

    await nextTick();

    if (currentTurn.turn) {
      options.puzzle.turn(currentTurn.turn);
    }

    await nextTick();
  
    if (queue.value.length > 0) {
      queue.value.shift();
    }
  }

  // turns awaiting execution
  const queue = ref<QueuedTurn[]>([]);

  // current turn being executed
  const currentTurn = computed(() => queue.value[0]);

  // tracks if the puzzle is currently turning
  const isTurning = ref(false);

  // normalized value for if turning is disabled
  const isTurningDisabled = computed(() => {
    return Boolean(unref(options.disabled));
  });

  // number of turns that have been executed
  const turnCount = ref(0);

  // total progress from 0 to the current turn count
  const totalProgress = useTransition(turnCount, {
    duration: tempDuration,
    onFinished: advanceNextTurn,
    transition: linear,
  });

  // current turn progress from 0 to 1
  const turnProgress = computed(() => {
    return isTurning.value && currentTurn.value
      ? 1 - (turnCount.value - totalProgress.value)
      : 0;
  });

  // queue a turn for execution
  const queueTurn = (turn: string) => {
    if (!isTurningDisabled.value) {
      queue.value.push({ turn });
    }
  }

  watch(queue.value, () => {
    if (!isTurning.value && currentTurn.value) {
      isTurning.value = true;
      turnCount.value += 1;
    }
  });

  return {
    currentTurn,
    isTurning,
    queueTurn,
    turnProgress,
  };
}