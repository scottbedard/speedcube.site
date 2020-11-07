import { times } from 'lodash-es';

/**
 * Create a column map.
 */
export function mapColumns(n: number) {
  return times(n ** 2).map((x, i) => i % n);
}

/**
 * Create a row map.
 */
export function mapRows(n: number) {
  return times(n ** 2).map((x, i) => Math.floor(i / n));
}
