import { ComputedRef, Ref } from 'vue';

/**
 * Maybe reactive.
 */
export type MaybeRef<T> = T | ComputedRef<T> | Ref<T>;
