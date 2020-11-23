import { Cube, Dodecaminx } from '@bedard/twister';
import { cubeSize, dodecaminxSize, isCube, isDodecaminx } from '@/app/utils/puzzle';
import { computed } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

interface UseModelOptions {
  route: RouteLocationNormalizedLoaded,
}

/**
 * Solve model
 */
export function useModel({ route }: UseModelOptions) {
  return computed(() => {
    const puzzle = (route.params?.puzzle as string).toLowerCase().trim();

    if (isCube(puzzle)) {
      return new Cube({ size: cubeSize(puzzle) });
    }

    if (isDodecaminx(puzzle)) {
      return new Dodecaminx({ size: dodecaminxSize(puzzle) });
    }
  });
}
