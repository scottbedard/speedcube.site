import { clamp } from 'lodash-es';
import { PerspectiveCamera } from 'three';
import { computed, watchEffect } from '@vue/composition-api';
import { clampPositive, degreesToRadians } from '@/app/utils/math';
import { Reactive } from '../types';

/**
 * Options
 */
export type UsePerspectiveCameraOptions = {
  cameraAngle?: Reactive<number>;
  cameraAspect?: number;
  cameraDistance?: Reactive<number>;
  cameraFar?: number;
  cameraFov?: number;
  cameraNear?: number;
};

/**
 * Perspectiev Camera
 */
export function usePerspectiveCamera(opts: UsePerspectiveCameraOptions = {}) {
  // static
  const aspect = opts.cameraAspect || 1;
  const far = opts.cameraFar || 10;
  const fov = opts.cameraFov || 60;
  const near = opts.cameraNear || 1;

  // computed
  const angle = computed(() => clamp(-(opts.cameraAngle?.value || 0) + 90, 0, 90));
  const distance = computed(() => clampPositive(opts.cameraDistance?.value || 1));

  // create camera
  const camera = new PerspectiveCamera(fov, aspect, near, far);

  watchEffect(() => {
    const radians = degreesToRadians(angle.value);
    const adjacent = Math.sin(radians) * distance.value;
    const opposite = Math.cos(radians) * distance.value;

    camera.position.set(0, opposite, adjacent);
    camera.lookAt(0, 0, 0);
  });

  return camera;
}
