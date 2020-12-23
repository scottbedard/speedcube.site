import { ref } from 'vue';
import { KeyboardConfig } from '@/types/puzzle';

/**
 * Current keyspace, null is default
 */
export const currentKeyspace = ref<string>('default');

/**
 * Pending puzzle configuration.
 */
export const pendingConfig = ref<Record<string, any> | null>(null);

/**
 * Pending keyboard config.
 */
export const pendingKeyboardConfig = ref<KeyboardConfig | null>(null);

/**
 * Reset all solve state.
 */
export function resetSolveState() {
  pendingConfig.value = null;
}