import { AmbientLight, PointLight } from 'three';
import { computed } from '@vue/composition-api';
import { normalizeVector } from './helpers';
import { RawVectorObject } from './types';
import { usePosition } from './usePosition';

export type LightOptions = {
  color?: number;
  intensity?: number;
  position?: Record<string, number>;
  type?: 'ambient' | 'point';
}

/**
 * Create a light.
 */
export function useLight(options: LightOptions = {}) {
  const normalizedOptions = computed(() => ({
    color: options.color || 0xffffff,
    intensity: options.intensity || 1,
    position: options.position || {},
    type: options.type || 'ambient',
  }));

  const LightConstructor = normalizedOptions.value.type === 'ambient' ? AmbientLight : PointLight;

  const light = new LightConstructor(
    normalizedOptions.value.color,
    normalizedOptions.value.intensity,
  );

  usePosition(light, normalizedOptions.value.position);

  return light;
}
