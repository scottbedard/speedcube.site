import { rotate } from './math';
import { Vector2 } from '@/types/math';

type Unit = 
  | 'circumRadius'
  | 'edgeLength';

// these functions only support certain input units. this will be
// be thrown if the input does not match a supported unit.
const NOT_IMPLEMENTED = 'not implemented';

/**
 * Caclulate the edge length of a dodecahedron.
 */
export function dodecahedronEdgeLength(val: number, unit: Unit): number {
  if (unit === 'circumRadius') {
    return (4 * val) / (Math.sqrt(3) * (1 + Math.sqrt(5)));
  }

  throw NOT_IMPLEMENTED;
}

/**
 * Calculate the circumradius of a regular pentagon.
 */
export function pentagonCircumradius(val: number, unit: Unit): number {
  if (unit === 'edgeLength') {
    return (val / 10) * Math.sqrt(50 + (10 * Math.sqrt(5)));
  }

  throw NOT_IMPLEMENTED;
}

/**
 * Calculate the inradius of a regular pentagon.
 */
export function pentagonInradius(val: number, unit: Unit): number {
  if (unit === 'edgeLength') {
    return (val / 10) * Math.sqrt(25 + (10 * Math.sqrt(5)));
  }

  throw NOT_IMPLEMENTED;
}

/**
 * Create a regular polygon.
 */
export function polygon(sides: number, radius: number = 1): Vector2[] {
  return new Array(sides).fill(null).map((n, i) => rotate([0, radius], (360 / sides) * i));
}

/**
 * Collapse duplicate points in a vector path.
 */
export function uniquePath(vectors: Vector2[]): Vector2[] {
  return vectors.reduce<Vector2[]>((acc, v, i, arr) => {
    if (i === arr.length - 1) {
      const first = acc[0];

      if (first && (first[0] !== v[0] || first[1] !== v[1])) {
        acc.push(v);
      }
    } else {
      const prev = acc.slice(-1).pop();

      if (!prev || prev[0] !== v[0] || prev[1] !== v[1]) {
        acc.push(v);
      }
    }

    return acc;
  }, []);
}