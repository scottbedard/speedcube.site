import { ComputedRef, Ref } from '@vue/composition-api';

/**
 * Incomplete vector coordinates
 */
export type IncompleteVector = {
 x?: number,
 y?: number,
 z?: number,
};

/**
 * Possibly reactive value
 */
export type PossiblyReactive<T> = T | Reactive<T>;

/**
 * Reactive value
 */
export type Reactive<T> = ComputedRef<T> | Ref<T>;
