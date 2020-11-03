import { Line2, Vector2 } from '@/types/math';

/**
 * Bi-linear interpolation between vectors
 */
export function bilerp([x1, y1]: Vector2, [x2, y2]: Vector2, alpha: number): Vector2 {
  return [lerp(x1, x2, alpha), lerp(y1, y2, alpha)];
}

/**
 * Convert degrees to radians.
 */
export function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

/**
 * Intersect two lines
 */
export function intersect([v1, v2]: Line2, [v3, v4]: Line2): Vector2 {
  const [x1, y1] = v1, [x3, y3] = v3;
  const m1 = slope(v1, v2);
  const m3 = slope(v3, v4);

  // lines are parallel
  if (m1 === m3) {
    throw new Error('Cannot intersect parallel lines');
  }

  // first line is vertical
  const b3 = y3 - (m3 * x3);

  if (!isFinite(m1)) {
    return [x1, (m3 * x1) + b3];
  }

  // second line is vertical
  const b1 = y1 - (m1 * x1);

  if (!isFinite(m3)) {
    return [x3, (m1 * x3) + b1];
  }

  // calculate intersection point
  const x = (b3 - b1) / (m1 - m3);
  const y = (m1 * x) + b1;

  return [x, y];
}

/**
 * Test if a number is even.
 */
export function isEven(val: number) {
  return val % 2 === 0;
}

/**
 * Alias of Number.isInteger that acts as a type-guard.
 */
export function isInteger(val: any): val is number {
  return Number.isInteger(val);
}

/**
 * Linear interpolation between points
 */
export function lerp(p1: number, p2: number, alpha: number) {
  return ((1 - alpha) * p1) + (alpha * p2);
}

/**
 * Measure the distance between vectors
 */
export function measure([x1, y1]: Vector2, [x2, y2]: Vector2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

/**
 * Midpoint between two vectors.
 */
export function midpoint(v1: Vector2, v2: Vector2) {
  return bilerp(v1, v2, 0.5);
}

/**
 * Rotate a vector clockwise by degrees.
 */
export function rotate([x, y]: Vector2, degrees: number): Vector2 {
  const angle = degreesToRadians(-degrees);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return [(x * cos) - (y * sin), (x * sin) + (y * cos)];
}

/**
 * Calculate the slope between two vectors.
 */
export function slope([x1, y1]: Vector2, [x2, y2]: Vector2): number {
  return (y2 - y1) / (x2 - x1);
}

/**
 * Translate an explicit distance between vectors
 */
export function translate(v1: Vector2, v2: Vector2, distance: number) {
  return bilerp(v1, v2, distance / measure(v1, v2));
}
