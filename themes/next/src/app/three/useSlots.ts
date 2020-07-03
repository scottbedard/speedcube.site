import { Group } from 'three';
import { IncompleteVector, Reactive } from './types';

/**
 * Options
 */
export type UseSlotsOptions = {
  [key: string]: () => Reactive<IncompleteVector>;
}

/**
 * Slots
 */
export function useSlots(...args: any[]) {
  const slots = new Group();

  return slots;
}
