import { clamp } from 'lodash-es';
import { clampPositive, degreesToRadians } from '@/app/utils/math';
import { computed, ComputedRef, Ref, watchEffect } from 'vue';
import { PerspectiveCamera } from 'three';

interface PerspectiveCameraOptions {
  cameraAngle?: ComputedRef<number> | Ref<number>,
  cameraAspect?: number,
  cameraDistance?: ComputedRef<number> | Ref<number>,
  cameraFar?: number,
  cameraFov?: number,
  cameraNear?: number,
}

/**
 * Use perspective camera.
 */
export function usePerspectiveCamera(opts: PerspectiveCameraOptions = {}) {
  // static
  const aspect = opts.cameraAspect || 1;
  const far = opts.cameraFar || 10;
  const fov = opts.cameraFov || 60;
  const near = clamp(opts.cameraNear || 0, 0.0001, Infinity);
  
  // computed
  const angle = computed(() => clamp(-(opts.cameraAngle?.value || 0) + 90, 0, 90));
  const distance = computed(() => clampPositive(opts.cameraDistance?.value || 0));

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
