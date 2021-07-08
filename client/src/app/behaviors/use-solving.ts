import { Ref } from 'vue'
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
  const { createSolve, pendingSolve } = useCreateSolve()

  // twister controls
  const {
    currentTurn,
    model,
    turnProgress,
  } = usePuzzle({ config, puzzle })

  /**
   * Start the solve process
   */
  const start = () => {
    console.log('start')
  }

  return {
    currentTurn,
    model,
    start,
    turnProgress,
  }
}
