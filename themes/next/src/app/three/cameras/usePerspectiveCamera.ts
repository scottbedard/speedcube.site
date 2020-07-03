import { clamp } from 'lodash-es';
import { PerspectiveCamera } from 'three';
import {
  computed, ref, Ref, watch, watchEffect,
} from '@vue/composition-api';
import { clampPositive, degreesToRadians } from '@/app/utils/math';
import { RawVectorObject } from '../types';

/**
 * Perspective camera options.
 */
export type UserPerspectiveCameraOptions = {
  cameraAngle?: Ref<number|undefined>;
  cameraAspect?: Ref<number|undefined>;
  cameraDistance?: Ref<number|undefined>;
  cameraFar?: Ref<number|undefined>;
  cameraFov?: Ref<number|undefined>;
  cameraNear?: Ref<number|undefined>;
};

/**
 * Perspectiev Camera
 */
export function usePerspectiveCamera(opts: UserPerspectiveCameraOptions = {}) {
  const cameraAngle = computed(() => clamp(-(opts.cameraAngle?.value || 0) + 90, 0, 90));

  const cameraAspect = computed(() => opts.cameraAspect?.value || 1);
  const cameraDistance = computed(() => clampPositive(opts.cameraDistance?.value || 1));
  const cameraFar = computed(() => opts.cameraFar?.value || 10);
  const cameraFov = computed(() => opts.cameraFov?.value || 60);
  const cameraNear = computed(() => opts.cameraNear?.value || 1);

  const camera = new PerspectiveCamera(
    cameraFov.value,
    cameraAspect.value,
    cameraNear.value,
    cameraFar.value,
  );

  watchEffect(() => camera.setFocalLength(cameraFov.value));

  watchEffect(() => {
    const angle = degreesToRadians(cameraAngle.value);
    const adjacent = Math.sin(angle) * cameraDistance.value;
    const opposite = Math.cos(angle) * cameraDistance.value;

    camera.position.set(0, opposite, adjacent);
    camera.lookAt(0, 0, 0);
  });

  return camera;
}
