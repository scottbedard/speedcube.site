import { PointLight } from 'three';
import { usePosition } from '../usePosition';
import { PossiblyReactive, IncompleteVector } from '../types';

/**
 * Options
 */
export type UsePointLightOptions = {
  color?: number;
  intensity?: number;
  position?: PossiblyReactive<IncompleteVector>;
};

/**
 * Point light
 */
export function usePointLight(rawOpts: UsePointLightOptions = {}) {
  const opts = {
    color: 0xffffff,
    intensity: 1,
    position: {},
    ...rawOpts,
  };

  const light = new PointLight(opts.color, opts.intensity);

  usePosition(light, opts.position);

  return light;
}
