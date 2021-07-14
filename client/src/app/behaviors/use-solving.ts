import { clamp } from 'lodash-es'
import { computed, ref, Ref, watch } from 'vue'
import { isInspectionTurn, slow, Solution } from '@/app/utils'
import { useAbortSolve, useCompleteSolve, useCreateSolve } from '@/app/api'
import { useKeybindings, useTimer } from '@/app/behaviors'
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
 * Inspection duration
 */
const inspectionDuration = 15000

/**
 * Scramble duration
 */
const scrambleDuration = 2000

/**
 * Helper to test for statuses
 */
const isStatus = (status: SolvingStatus, arr: SolvingStatus[]) => arr.includes(status)

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

  const { 
    completeSolve,
    failed: completeSolveFailed,
    loading: completeSolveLoading,
  } = useCompleteSolve()

  /**
   * Timer controls
   */
  const {
    pause: pauseTimer,
    reset: resetTimer,
    resume: resumeTimer,
    time,
  } = useTimer()

  /**
   * Solution
   */
  const solution = ref<Solution>(new Solution)
  
  /**
   * Solve ID
   */
  const solveId = ref(0)
  
  /**
   * Current solving status
   */
  const status = ref<SolvingStatus>('idle')

  /**
   * Timestamp that the transition from 'inspection' to 'solving' happened
   */
  const startTime = ref(0)

  /**
   * Countdown timer
   */
  const inspectionTime = computed(() => {
    return clamp(inspectionDuration - time.value, 0, inspectionDuration)
  })

  /**
   * Solve timer
   */
  const solveTime = computed(() => time.value - startTime.value)

  /**
   * Twister controls
   */
  const {
    currentTurn,
    model,
    puzzleName,
    scrambling,
    turn,
    turnProgress,
  } = usePuzzle({
    config,
    puzzle,
    onScramblingEnd: () => {
      // begin inspection when scrambling animation ends
      if (status.value === 'scrambling') {
        startInspection()
      }
    },
    onTurnEnd() {
      // check if the puzzle has been solved
      if (status.value === 'solving' && model.value.test()) {
        complete()
      }
    },
    onTurnStart() {
      // only record turns that occur during the solve
      if (isStatus(status.value, ['inspection', 'solving'])) {
        solution.value.addTurn(currentTurn.value.notation, time.value)
      }
    }
  })

  /**
   * Keybinding listener
   */
  useKeybindings(keybindings, (binding) => {
    // do nothing if we're currently scrambling, or if the turn violates inspection rules
    if (
      status.value === 'scrambling' ||
      (status.value === 'inspection' && !isInspectionTurn(model.value, binding.turn))
    ) {
      return
    }

    // otherwise queue the turn for execution
    turn(binding.turn)
  })

  /**
   * Watch inspection time
   */
  watch(inspectionTime, (value) => {
    // start the solve when inspection hits zero
    if (status.value === 'inspection' && value === 0) {
      startSolve()
    }
  })

  /**
   * Abort a solve
   */
  const abort = async () => {
    pauseTimer()

    status.value = 'dnf'

    // kill outstanding scrambling animation. this must be
    // done after setting status to 'dnf', otherwise when the
    // animation completes it would advance to 'inspection'
    scrambling.value = false
    
    solution.value.addEvent('ABORT', time.value)

    await abortSolve({ 
      solution: solution.value.toString(),
      solveId: solveId.value, 
    })
  }

  /**
   * Complete a solve
   */
  const complete = async () => {
    pauseTimer()

    status.value = 'complete'

    solution.value.addEvent('END', time.value)

    await completeSolve({ 
      solution: solution.value.toString(),
      solveId: solveId.value, 
    })
  }

  /**
   * Start the solve process
   */
  const scramble = async () => {
    // do nothing if a we aren't ready to start a new solve
    if (!ready.value || isStatus(status.value, ['scrambling', 'inspection', 'solving'])) {
      return
    }

    // begin the scrambling process, and start the animated loading state
    // status controls gameplay logic, scrambling controls the animation
    status.value = 'scrambling'
    scrambling.value = true

    // create solve model
    const pendingSolve = await slow(createSolve({ puzzle: puzzleName.value }), scrambleDuration)

    // stop the animation and apply scrambled state
    if (status.value === 'scrambling') {
      solveId.value = pendingSolve.solveId
      
      scrambling.value = false

      model.value.apply(pendingSolve.state)
    }
  }

  /**
   * Start inspection
   */
  const startInspection = () => {
    status.value = 'inspection'

    solution.value.reset()

    resetTimer()
    resumeTimer()
  }

  /**
   * Start the solve
   */
   const startSolve = () => {
    status.value = 'solving'

    startTime.value = clamp(time.value, 0, inspectionDuration)

    solution.value.addEvent('START', startTime.value)
  }

  /**
   * Keyup listener
   */
  useEventListener(document, 'keyup', (e) => {
    if (e.code === 'Escape') {
      if (isStatus(status.value, ['scrambling', 'inspection', 'solving'])) {
        abort()
      } else {
        model.value.reset()
        status.value = 'idle'
      }
    } else if (e.code === 'Space') {
      if (status.value === 'inspection') {
        startSolve()
      } else {
        scramble()
      }
    }
  })

  return {
    completeSolveFailed,
    completeSolveLoading,
    currentTurn,
    inspectionTime,
    model,
    scramble,
    scrambling,
    solveTime,
    status,
    turnProgress,
  }
}
