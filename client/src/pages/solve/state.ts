import { ref } from 'vue';
import { KeyboardConfig } from '@/types/puzzle';

/**
 * Current keyspace, null is default
 */
export const currentKeyspace = ref<string>('default');

/**
 * Disable puzzle turning.
 */
export const isTurningDisabled = ref(false);

/**
 * Pending puzzle configuration.
 */
export const pendingConfig = ref<Record<string, any> | null>(null);

/**
 * Pending keyboard config.
 */
export const pendingKeyboardConfig = ref<KeyboardConfig | null>(null);

/**
 * Reset solve state.
 */
export function resetSolveState() {
  currentKeyspace.value = 'default';
  isScrambleLoading.value = false;
  isTurningDisabled.value = false;
  pendingConfig.value = null;
  pendingConfig.value = null;
  pendingKeyboardConfig.value = null;
}

/**
 * Scrambled loading.
 */
export const isScrambleLoading = ref(false);