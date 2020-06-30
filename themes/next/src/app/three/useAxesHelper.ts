import { AxesHelper } from 'three';

export type AxesHelperOptions = {
  // ...
};

/**
 * Axes helper.
 */
export function useAxesHelper(options: AxesHelperOptions = {}) {
  const axesHelper = new AxesHelper(100);

  axesHelper.position.set(0, 0, 0);

  return axesHelper;
}
