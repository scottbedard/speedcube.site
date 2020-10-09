import { ComputedRef, Ref } from 'vue';

/**
 * Reactive value.
 */
export type Reactive<T> = Ref<T> | ComputedRef<T>;

/**
 * Vector coordinates
 */
export type Vector = {
  x: number,
  y: number,
  z: number,
};
