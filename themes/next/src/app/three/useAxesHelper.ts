import { computed, Ref, watchEffect } from '@vue/composition-api';
import { AxesHelper } from 'three';
import { usePosition } from './usePosition';
import { RawVectorObject } from './types';

export type AxesHelperOptions = {
  position?: Ref<RawVectorObject>;
};

/**
 * Axes helper.
 */
export function useAxesHelper(opts: AxesHelperOptions = {}) {
  const axesHelper = new AxesHelper(100);
  const position = computed(() => opts.position?.value || {});

  usePosition(axesHelper, position);

  return axesHelper;
}
