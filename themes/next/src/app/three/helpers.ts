import { isRef } from '@vue/composition-api';
import { IncompleteVector, PossiblyReactive } from './types';

/**
 * Get a ref value
 */
export function getValue<T>(valueOrRef: PossiblyReactive<T>) {
  if (isRef(valueOrRef)) {
    return valueOrRef.value;
  }

  return valueOrRef;
}

/**
 * Normalize an incomplete vector.
 */
export function normalizeVector(obj: IncompleteVector) {
  return {
    x: 0, y: 0, z: 0, ...obj,
  };
}
