import { ref } from 'vue';

/**
 * Pending puzzle configuration.
 */
export const pendingPuzzleConfig = ref<Record<string, any> | null>(null);

/**
 * Reset all solve state.
 */
export function resetSolveState() {
  pendingPuzzleConfig.value = null;
}