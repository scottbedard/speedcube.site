import { ref, Ref } from 'vue'
import { slow } from '@/app/utils'
import { useCreateSolve } from '@/app/api'
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

/**
 * Standard puzzle solving.
 */
export function useSolving({
  config,
  puzzle,
}: UseSolvingOptions) {
  // utils to create a solve model
  const { createSolve } = useCreateSolve()

  // gameplay status
  const status = ref<SolvingStatus>('idle')

  // twister controls
  const {
    currentTurn,
    model,
    puzzleName,
    scrambling,
    turnProgress,
  } = usePuzzle({
    config,
    puzzle,
    onScramblingEnd: () => {
      status.value = 'inspection'
    },
  })

  /**
   * Start the solve process
   */
  const scramble = async () => {
    // do nothing if we're not ready to begin a solve
    if (status.value !== 'idle' && status.value !== 'complete') {
      return
    }

    // begin the scrambling process, and start the animated loading state
    // status controls gameplay logic, scrambling controls the animation
    status.value = 'scrambling'
    scrambling.value = true

    // create solve model
    const solve = await slow(createSolve({ puzzle: puzzleName.value }), 3000)
    
    // stop the animation and apply scrambled state
    scrambling.value = false
    model.value.apply(solve.state)
  }

  return {
    currentTurn,
    model,
    scramble,
    scrambling,
    status,
    turnProgress,
  }
}
