import { Object3D } from 'three';
import {
  computed, Ref, watch, watchEffect,
} from '@vue/composition-api';
import { normalizeVector } from './helpers';
import { RawVectorObject } from './types';

/**
 * Sync an object's position.
 */
export function usePosition(
  obj: Object3D,
  position?: Ref<RawVectorObject>,
) {
  if (position) {
    watchEffect(() => {
      const { x, y, z } = normalizeVector(position.value);

      obj.position.setX(x);
      obj.position.setY(y);
      obj.position.setZ(z);
    });
  }
}
