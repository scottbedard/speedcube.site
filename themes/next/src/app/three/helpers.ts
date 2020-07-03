import { isRef } from '@vue/composition-api';
import { PossiblyReactive } from './types';

/**
 * Get a ref value.
 */
export function getValue<T>(valueOrRef: PossiblyReactive<T>) {
  if (isRef(valueOrRef)) {
    return valueOrRef.value;
  }

  return valueOrRef;
}
