import { Object3D } from 'three';
import { watchEffect } from '@vue/composition-api';
import { getValue } from './helpers';
import { PossiblyReactive, IncompleteVector } from './types';

/**
 * Origin vector
 */
const origin = { x: 0, y: 0, z: 0 };

/**
 * Sync an object's position.
 */
export function usePosition(obj: Object3D, position?: PossiblyReactive<IncompleteVector>) {
  if (position) {
    watchEffect(() => {
      const { x, y, z } = { ...origin, ...getValue(position) };

      obj.position.set(x, y, z);
    });
  }
}
