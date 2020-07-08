import { AmbientLight } from 'three';
import { usePosition } from '../usePosition';
import { PossiblyReactive, IncompleteVector } from '../types';

/**
 * Ambient light options
 */
export type UseAmbientLightOptions = {
  color?: number;
  intensity?: number;
  position?: PossiblyReactive<IncompleteVector>;
};

/**
 * Ambient light.
 */
export function useAmbientLight(rawOpts: UseAmbientLightOptions = {}) {
  const opts = {
    color: 0xffffff,
    intensity: 1,
    position: {},
    ...rawOpts,
  };

  const light = new AmbientLight(opts.color, opts.intensity);

  usePosition(light, opts.position);

  return light;
}
