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
  config: Ref<Record<string, unknown>>

  /**
   * Keybinding configuration
   */
  keybindings: Ref<Record<string, string>>

  /**
   * Non-normalized puzzle name
   */
  puzzle: Ref<string>

  /**
   * Controls if we're ready for gameplay. This is false when the
   * user is customizing settings, editing keybindings, etc...
   */
  ready: Ref<boolean>
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
  ready,
}: UseSolvingOptions) {
  const { abortSolve } = useAbortSolve()
  const { createSolve } = useCreateSolve()

  // solve state
  const solution = ref<Solution>(new Solution)
  
  const solveId = ref(0)
  
  const status = ref<SolvingStatus>('idle')

  const solveInProgress = computed(() => {
    return status.value === 'scrambling'
      || status.value === 'inspection'
      || status.value === 'solving'
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
      } else if (status.value === 'dnf') {
        model.value.reset()
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

    if (status.value === 'inspection') {
      solution.value.addTurn(binding.turn, inspectionTime.value);
    }

    if (status.value === 'solving') {
      solution.value.addTurn(binding.turn, solveTime.value);
    }
  })

  /**
   * Abort a solve
   */
  const abort = async () => {
    status.value = 'dnf'

    // kill outstanding scrambling animation. this must be
    // done after setting status to 'dnf', otherwise when the
    // animation completes it would advance to 'inspection'
    scrambling.value = false

    resetInspectionTimer()
    resetSolveTimer()

    await abortSolve({ 
      solution: solution.value.toString(),
      solveId: solveId.value, 
    })
  }

  /**
   * Start the solve process
   */
  const scramble = async () => {
    // do nothing if a we aren't ready to start a new solve
    if (!ready.value || solveInProgress.value) {
      return
    }

    // begin the scrambling process, and start the animated loading state
    // status controls gameplay logic, scrambling controls the animation
    status.value = 'scrambling'
    scrambling.value = true

    // reset everything
    solution.value.reset()
    resetInspectionTimer()
    resetSolveTimer()

    // create solve model
    const pendingSolve = await slow(createSolve({ puzzle: puzzleName.value }), 3000)

    // stop the animation and apply scrambled state
    if (status.value === 'scrambling') {
      solveId.value = pendingSolve.solveId
      
      scrambling.value = false

      model.value.apply(pendingSolve.state)
    }
  }

  /**
   * Keyup listener
   */
  useEventListener(document, 'keyup', (e) => {
    if (e.code === 'Escape') {
      if (solveInProgress.value) {
        abort()
      } else {
        model.value.reset()
        status.value = 'idle'
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
    solution,
    solveTime,
    status,
    turnProgress,
  }
}
