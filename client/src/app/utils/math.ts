import { Vector2 } from '@/types/math';

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
 * Rotate a vector clockwise by degrees.
 */
export function rotate([x, y]: Vector2, degrees: number): Vector2 {
  const angle = degreesToRadians(-degrees);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return [(x * cos) - (y * sin), (x * sin) + (y * cos)];
}

/**
 * Translate an explicit distance between vectors
 */
export function translate(v1: Vector2, v2: Vector2, distance: number) {
  return bilerp(v1, v2, distance / measure(v1, v2));
}
