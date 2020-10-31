/**
 * Roll an array forwards or backwards.
 */
export function roll<T>(arr: T[], n: number): T[] {
  const offset = (((n % arr.length) + arr.length) % arr.length);

  return arr.slice(offset).concat(arr.slice(0, offset));
}
