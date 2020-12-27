import { computed, ComputedRef, ref, watch } from 'vue';
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
  const model = ref<Cube | Dodecaminx | null>(null);

  watch(puzzleName, (name, oldName) => {
    if (name !== oldName) {
      if (isCube(name)) {
        model.value = new Cube({ size: cubeSize(name) });
      }
  
      if (isDodecaminx(name)) {
        model.value = new Dodecaminx({ size: dodecaminxSize(name) });
      }
    }
  }, {
    immediate: true,
  });
  
  return model;
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
    return (route.params.puzzle as string)?.trim().toLowerCase();
  });
}
