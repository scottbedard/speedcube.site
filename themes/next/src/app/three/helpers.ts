import { isRef } from '@vue/composition-api';
import { isArray, uniqueId } from 'lodash-es';
import { Shape, ShapeBufferGeometry } from 'three';
import { Garbage, IncompleteVector, PossiblyReactive } from './types';

/**
 * Create a garbage for threejs objects
 */
export function createGarbage(): Garbage {
  const bin: Record<string, Function[]> = {};

  const add = (id: string, ...fns: Function[]) => {
    bin[id].push(...fns);
  };

  const createId = () => uniqueId();

  const empty = (id: string) => {
    if (isArray(bin[id])) {
      bin[id].forEach((fn) => fn());
    }

    bin[id] = [];
  };

  return {
    add, bin, createId, empty,
  };
}

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

/**
 * Create a rounded rectangle geometry
 */
export function roundedRectangle(height: number, width: number, radius = 0) {
  const shape = new Shape();

  shape.moveTo(0, radius);
  shape.lineTo(0, height - radius);
  shape.quadraticCurveTo(0, height, radius, height);
  shape.lineTo(width - radius, height);
  shape.quadraticCurveTo(width, height, width, height - radius);
  shape.lineTo(width, radius);
  shape.quadraticCurveTo(width, 0, width - radius, 0);
  shape.lineTo(radius, 0);
  shape.quadraticCurveTo(0, 0, 0, radius);

  return new ShapeBufferGeometry(shape);
}
