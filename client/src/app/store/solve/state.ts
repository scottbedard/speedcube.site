import { defaultPuzzleName } from './config';
import { ref } from 'vue';

/**
 * Status
 */
export const status = ref<'idle' | 'scramble' | 'inspection' | 'solving'>('idle');

/**
 * Puzzle name
 */
export const puzzleName = ref(defaultPuzzleName);
