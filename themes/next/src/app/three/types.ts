import { ComputedRef, Ref } from '@vue/composition-api';
import { Object3D } from 'three';

/**
 * Incomplete vector coordinates
 */
export type IncompleteVector = {
 x?: number,
 y?: number,
 z?: number,
};

/**
 * An object that can be nested
 */
export type Nestable = Object3D | Object3D[] | undefined;

/**
 * Possibly reactive value
 */
export type PossiblyReactive<T> = T | Reactive<T>;

/**
 * Reactive value
 */
export type Reactive<T> = ComputedRef<T> | Ref<T>;
