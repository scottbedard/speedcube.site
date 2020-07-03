/* eslint-disable no-param-reassign */
import { Object3D } from 'three';
import { watchEffect } from '@vue/composition-api';
import { degreesToRadians } from '@/app/utils/math';
import { getValue, normalizeVector } from './helpers';
import { IncompleteVector, PossiblyReactive } from './types';

/**
 * Rotation
 */
export function useRotation(obj: Object3D, rotation?: PossiblyReactive<IncompleteVector>) {
  if (rotation) {
    watchEffect(() => {
      const { x, y, z } = normalizeVector(getValue(rotation));

      obj.rotation.x = degreesToRadians(x);
      obj.rotation.y = degreesToRadians(y);
      obj.rotation.z = degreesToRadians(z);
    });
  }
}
