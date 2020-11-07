import { Ref, unref } from 'vue';
import { Shape, ShapeBufferGeometry } from 'three';
import { Vector2 } from '@/types/math';

/**
 * Create a shape buffer geometry from points.
 * 
 * @todo: support radius alpha
 */
export function createShape(vectors: Ref<Vector2[]> | Vector2[]) {
  const shape = new Shape();

  unref(vectors).forEach((vector, index) => {
    if (index === 0) {
      shape.moveTo(vector[0], vector[1]);
    } else {
      shape.lineTo(vector[0], vector[1]);
    }
  });

  return new ShapeBufferGeometry(shape);
}