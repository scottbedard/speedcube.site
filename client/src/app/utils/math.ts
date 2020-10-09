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
