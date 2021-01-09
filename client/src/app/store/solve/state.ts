import { defaultPuzzleName } from './config';
import { PuzzleName } from '@/types/puzzle';
import { ref } from 'vue';

/**
 * Puzzle name
 */
export const puzzleName = ref<PuzzleName>(defaultPuzzleName);
