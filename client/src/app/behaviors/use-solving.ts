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
  const scramble = () => {
    // do nothing if we're not ready to begin a solve
    if (status.value !== 'idle' && status.value !== 'complete') {
      return
    }

    // begin scrambling and create our solve model
    scrambling.value = true
    status.value = 'scrambling'

    slow(createSolve({ puzzle: puzzleName.value }), 3000).then(pendingSolve => {
      // stop scrambling and apply scrambled state
      scrambling.value = false
      model.value.apply(pendingSolve.state)
    })
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
