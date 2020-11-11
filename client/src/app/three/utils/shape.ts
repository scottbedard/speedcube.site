import { clamp } from 'lodash-es';
import { measure, translate } from '@/app/utils/math';
import { Ref, unref } from 'vue';
import { roll } from '@/app/utils/array';
import { Shape, ShapeBufferGeometry } from 'three';
import { Vector2 } from '@/types/math';

/**
 * Create a shape buffer geometry from points.
 */
export function createShape(vectors: Ref<Vector2[]> | Vector2[], rawRadius: Ref<number> | number = 0) {
  const shape = new Shape();
  const radius = clamp(unref(rawRadius), 0, 1);

  unref(vectors).forEach((vector, index, arr) => {
    if (radius === 0) {
      if (index === 0) {
        shape.moveTo(vector[0], vector[1]);
      } else {
        shape.lineTo(vector[0], vector[1]);
      }
    } else {
      const pathFromPoint = roll(arr, index);
  
      // find end point of previous curve
      const prev = roll(pathFromPoint, -1).shift() as Vector2;
      const prev2 = roll(pathFromPoint, -2).shift() as Vector2;
      const prevCurveDist = Math.min(measure(vector, prev) / 2, measure(prev, prev2) / 2) * radius;
      const prevCurveEnd = translate(prev, vector, prevCurveDist);
  
      // find start / end points of current curve
      const next = roll(pathFromPoint, 1).shift() as Vector2;
      const next2 = roll(pathFromPoint, 2).shift() as Vector2;
      const curveDist = Math.min(measure(vector, prev) / 2, measure(vector, next) / 2, measure(vector, next2) / 2) * radius;
      const curveStart = translate(vector, prev, curveDist);
      const curveEnd = translate(vector, next, curveDist);
  
      // start drawing from the end of the previous curve
      if (index === 0) {
        shape.moveTo(prevCurveEnd[0], prevCurveEnd[1]);
      }
  
      // draw line to the start of the current curve
      shape.lineTo(curveStart[0], curveStart[1]);

      // draw the current curve
      // shape.lineTo(curveEnd[0], curveEnd[1]);
      shape.quadraticCurveTo(vector[0], vector[1], curveEnd[0], curveEnd[1]);
    }
  });

  return new ShapeBufferGeometry(shape);
}