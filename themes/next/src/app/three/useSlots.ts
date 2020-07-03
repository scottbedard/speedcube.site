import { Object3D } from 'three';
import { useNestable } from './useNestable';
import { Nestable } from './types';
import { useGroup, UseGroupOptions } from './utils/useGroup';

/**
 * Slots
 */
export function useSlots(
  parent: Object3D,
  slots: Record<string, UseGroupOptions> = {},
  content: Record<string, Nestable>,
) {
  Object.entries(slots).forEach(([key, slotOpts]) => {
    const slot = useGroup(slotOpts);

    if (content[key]) {
      useNestable(slot, content[key]);
    }

    parent.add(slot);
  });
}
