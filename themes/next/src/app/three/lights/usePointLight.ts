import { PointLight } from 'three';

export function usePointLight() {
  const light = new PointLight(0x00ff00, 0.2);

  light.position.set(0, 200, 200);

  return light;
}
