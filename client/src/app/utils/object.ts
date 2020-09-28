import { isPlainObject, mapKeys, mapValues, snakeCase } from 'lodash-es';

/**
 * Map object keys recursively
 */
export function mapKeysDeep(source: any, fn: (k: string) => string): any {
  return Array.isArray(source)
    ? source.map(item => mapKeysDeep(item, fn))
    : isPlainObject(source)
      ? mapValues(mapKeys(source, (v, k) => fn(k)), v => mapKeysDeep(v, fn))
      : source;
}

/**
 * Snake case keys recursively
 */
export function snakeCaseKeysDeep(source: object): object {
  return mapKeysDeep(source, snakeCase);
}