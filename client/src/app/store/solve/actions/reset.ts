import { defaultPuzzleName } from '../config';

import {
  puzzleName,
  status,
} from '../state';

/**
 * Reset solve state
 */
export function reset() {
  puzzleName.value = defaultPuzzleName;
  status.value = 'idle';
}
