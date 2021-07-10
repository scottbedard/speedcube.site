/* eslint-disable */
import { computed, ref, Ref } from 'vue'
import { slow, Solution } from '@/app/utils'
import { useAbortSolve, useCreateSolve } from '@/app/api'
import { useCountdown, useKeybindings, useTimer } from '@/app/behaviors'
import { useEventListener } from '@vueuse/core'
import { usePuzzle } from './use-puzzle'

/**
 * Options
 */
type UseSolvingOptions = {
  /**
   * Puzzle configuration
   */
  config: Ref<Record<string, unknown>>;

  /**
   * Keybinding configuration
   */
  keybindings: Ref<Record<string, string>>;

  /**
   * Non-normalized puzzle name
   */
  puzzle: Ref<string>;
}

/**
 * Solving status
 */
export type SolvingStatus =
  | 'idle'
  | 'scrambling'
  | 'inspection'
  | 'solving'
  | 'complete'
  | 'dnf'

/**
 * Standard puzzle solving.
 */
export function useSolving({
  config,
  keybindings,
  puzzle,
}: UseSolvingOptions) {
  const { abortSolve } = useAbortSolve()
  const { createSolve } = useCreateSolve()

  // solve state
  const solution = ref<Solution>(new Solution)
  
  const solveId = ref(0)
  
  const status = ref<SolvingStatus>('idle')

  const solveInProgress = computed(() => {
    return status.value === 'inspection' || status.value === 'solving'
  })

  // twister controls
  const {
    currentTurn,
    model,
    puzzleName,
    scrambling,
    turnProgress,
    turns,
  } = usePuzzle({
    config,
    puzzle,
    onScramblingEnd: () => {
      // begin inspection when scrambling animation ends
      if (status.value === 'scrambling') {
        status.value = 'inspection'

        beginInspectionTimer()
      }
    },
  })

  // timer
  const {
    reset: resetSolveTimer,
    resume: beginSolveTimer,
    time: solveTime,
  } = useTimer()

  // inspection countdown
  const {
    reset: resetInspectionTimer,
    resume: beginInspectionTimer,
    timeRemaining: inspectionTime,
  } = useCountdown(3000, () => {
    // begin the solve
    status.value = 'solving'

    beginSolveTimer()
  })

  // keybinding listener
  useKeybindings(keybindings, (binding) => {
    if (status.value !== 'scrambling') {
      turns.value.push(binding.turn)
    }
  })

  /**
   * Abort a solve
   */
  const abort = async () => {
    status.value = 'dnf'

    resetInspectionTimer()

    await abortSolve({ 
      solution: solution.value.toString(),
      solveId: solveId.value, 
    })
  }

  /**
   * Reset solving behavior
   */
  const reset = () => {
    model.value.reset()
    solution.value.reset()
    solveId.value = 0
    status.value = 'idle'
  }

  /**
   * Start the solve process
   */
  const scramble = async () => {
    // do nothing if a solve is in progress
    if (solveInProgress.value) {
      return
    }

    // begin the scrambling process, and start the animated loading state
    // status controls gameplay logic, scrambling controls the animation
    status.value = 'scrambling'
    scrambling.value = true

    // reset everything
    resetInspectionTimer()
    resetSolveTimer()
    solution.value.reset()

    // create solve model
    const pendingSolve = await slow(createSolve({ puzzle: puzzleName.value }), 3000)

    solveId.value = pendingSolve.solveId
    
    // stop the animation and apply scrambled state
    scrambling.value = false

    model.value.apply(pendingSolve.state)
  }

  /**
   * Keyup listener
   */
  useEventListener(document, 'keyup', (e) => {
    if (e.code === 'Escape') {
      if (solveInProgress.value) {
        abort()
      } else {
        reset()
      }
    } else if (e.code === 'Space') {
      scramble()
    }
  })

  return {
    currentTurn,
    inspectionTime,
    model,
    scramble,
    scrambling,
    solveInProgress,
    solveTime,
    status,
    turnProgress,
  }
}
