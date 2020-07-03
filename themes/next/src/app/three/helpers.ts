import { isNumber, isUndefined } from 'lodash-es';
import { Object3D } from 'three';
import { isRef, Ref } from '@vue/composition-api';
import { VectorObject } from './types';

/**
 * Transform an object to a normalized vector object.
 */
export function normalizeVector(obj: Record<string, number|undefined> = {}): VectorObject {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0,
    z: isNumber(obj.z) ? obj.z : 0,
  };
}

/**
 * Get a ref value.
 */
export function getValue<T>(valueOrRef: T | Ref<T>) {
  if (isRef(valueOrRef)) {
    return valueOrRef.value;
  }

  return valueOrRef;
}
