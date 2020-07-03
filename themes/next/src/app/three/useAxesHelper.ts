import { AxesHelper } from 'three';
import { usePosition } from './usePosition';
import { IncompleteVector, Reactive } from './types';

/**
 * Options
 */
export type AxesHelperOptions = {
  position?: Reactive<IncompleteVector>;
};

/**
 * Axes helper
 */
export function useAxesHelper(opts: AxesHelperOptions = {}) {
  const axesHelper = new AxesHelper(100);

  usePosition(axesHelper, opts.position);

  return axesHelper;
}
