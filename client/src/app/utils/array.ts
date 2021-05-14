/**
 * Convert an array to object. This is necessary in situations where
 * PHP associative arrays are being converted to JSON incorrectly.
 */
export function arrayToObject<T extends unknown[] | Record<string, unknown>>(val: T) {
  return Array.isArray(val) ? {} : val;
}

/**
 * Roll an array forwards or backwards
 */
export function rollArray<T>(arr: T[], n: number): T[] {
  const offset = (((n % arr.length) + arr.length) % arr.length);

  return arr.slice(offset).concat(arr.slice(0, offset));
}
