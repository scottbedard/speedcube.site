import { Object3D } from 'three';
import { computed, Ref, watch } from '@vue/composition-api';
import { normalizeVector } from './helpers';
import { RawVectorObject } from './types';

export type UsePositionOptions = {

};

/**
 * Sync an object's position.
 */
export function usePosition(
  obj: Object3D,
  position?: RawVectorObject,
) {
  const { x, y, z } = normalizeVector(position);

  obj.position.setX(x);
  obj.position.setY(y);
  obj.position.setZ(z);
}
