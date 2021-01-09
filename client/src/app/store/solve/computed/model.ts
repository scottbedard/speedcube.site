import { computed } from 'vue';
import { Cube,  Dodecaminx } from '@bedard/twister';
import { cubeSize, dodecaminxSize, isCube, isDodecaminx } from '@/app/utils/puzzle';
import { puzzleName } from '../state';

/**
 * Model
 */
export const model = computed<Cube | Dodecaminx | null>(() => {
  if (isCube(puzzleName.value)) {
    const size = cubeSize(puzzleName.value);
    return new Cube({ size });
  }
  
  if (isDodecaminx(puzzleName.value)) {
    const size = dodecaminxSize(puzzleName.value);
    return new Dodecaminx({ size });
  }

  return null;
});
