/**
 * Clamp positive.
 */
export function clampPositive(n: number) {
  return Math.max(n, Number.EPSILON);
}

/**
 * Convert degrees to radians.
 */
export function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
