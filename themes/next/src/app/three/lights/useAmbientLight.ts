import { AmbientLight } from 'three';

/**
 * Ambient light.
 */
export function useAmbientLight() {
  const light = new AmbientLight(0xffffff, 0.8);

  light.position.set(0, 200, 200);

  return light;
}
