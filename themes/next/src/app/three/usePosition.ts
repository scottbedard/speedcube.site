import { Object3D } from 'three';
import { watchEffect } from '@vue/composition-api';
import { Reactive, IncompleteVector } from './types';

/**
 * Origin vector
 */
const origin = { x: 0, y: 0, z: 0 };

/**
 * Sync an object's position.
 */
export function usePosition(obj: Object3D, position?: Reactive<IncompleteVector>) {
  if (position) {
    watchEffect(() => {
      const { x, y, z } = { ...origin, ...position.value };

      obj.position.set(x, y, z);
    });
  }
}
