import { ref } from 'vue';

/**
 * Pending puzzle configuration.
 */
export const pendingConfig = ref<Record<string, any> | null>(null);

/**
 * Reset all solve state.
 */
export function resetSolveState() {
  pendingConfig.value = null;
}