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
const inspectionDuration = 5000;

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
  const { completeSolve } = useCompleteSolve()

  // timer
  const {
    pause: pauseTimer,
    reset: resetTimer,
    resume: resumeTimer,
    time
  } = useTimer()

  // solve state
  const solution = ref<Solution>(new Solution)
  
  const solveId = ref(0)
  
  const status = ref<SolvingStatus>('idle')

  const startTime = ref(0)

  const inspectionTime = computed(() => {
    return clamp(inspectionDuration - time.value, 0, inspectionDuration)
  })

  const solveTime = computed(() => time.value - startTime.value)

  // twister controls
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
      } else if (status.value === 'dnf') {
        model.value.reset()
      }
    },
    onTurnEnd() {
      if (status.value === 'solving' && model.value.test()) {
        complete()
      }
    },
    onTurnStart() {
      if (isStatus(status.value, ['inspection', 'solving'])) {
        solution.value.addTurn(currentTurn.value.notation, time.value);
      }
    }
  })

  // keybinding listener
  useKeybindings(keybindings, (binding) => {
    if (status.value === 'inspection' && !isInspectionTurn(model.value, binding.turn)) {
      return
    }

    if (status.value !== 'scrambling') {
      turn(binding.turn)
    }
  })

  // transition to solving when inspection hits zero
  watch(inspectionTime, (value) => {
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
    const pendingSolve = await slow(createSolve({ puzzle: puzzleName.value }), 3000)

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
