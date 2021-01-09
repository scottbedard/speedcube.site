import { defaultPuzzleName } from '../config';

import {
  puzzleName,
} from '../state';

/**
 * Reset solve state
 */
export function reset() {
  puzzleName.value = defaultPuzzleName;
}
