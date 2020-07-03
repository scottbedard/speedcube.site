import { computed, Ref, watchEffect } from '@vue/composition-api';
import { AxesHelper } from 'three';
import { usePosition } from './usePosition';
import { RawVectorObject } from './types';

/**
 * Axes helper options.
 */
export type AxesHelperOptions = {
  position?: Ref<RawVectorObject>;
};

/**
 * Axes helper.
 */
export function useAxesHelper(opts: AxesHelperOptions = {}) {
  const axesHelper = new AxesHelper(100);

  if (opts.position) {
    usePosition(axesHelper, opts.position);
  }

  return axesHelper;
}
