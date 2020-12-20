import { computed, ComputedRef } from 'vue';
import { Cube, Dodecaminx } from '@bedard/twister';
import { cubeSize, dodecaminxSize, getPuzzleId, isCube, isDodecaminx } from '@/app/utils/puzzle';
import { useRoute } from 'vue-router';

interface UseModelOptions {
  puzzleName: ComputedRef<string>,
}

/**
 * Solve model
 */
export function useModel({ puzzleName }: UseModelOptions) {
  return computed(() => {
    if (isCube(puzzleName.value)) {
      return new Cube({
        size: cubeSize(puzzleName.value),
      });
    }

    if (isDodecaminx(puzzleName.value)) {
      return new Dodecaminx({
        size: dodecaminxSize(puzzleName.value),
      });
    }
  });
}

/**
 * Puzzle ID
 */
export function usePuzzleId() {
  const route = useRoute();

  return computed(() => getPuzzleId(route.params.puzzle as string))
}

/**
 * Puzzle name
 */
export function usePuzzleName() {
  const route = useRoute();

  return computed(() => {
    return (route.params.puzzle as string).trim().toLowerCase();
  });
}
