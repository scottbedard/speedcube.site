import { Object3D } from 'three';
import { useNestable } from './useNestable';
import { useGroup, UseGroupOptions } from './useGroup';

/**
 * Slots
 */
export function useSlots(
  parent: Object3D,
  slots: Record<string, UseGroupOptions> = {},
  content: Record<string, Object3D|Object3D[]>,
) {
  Object.entries(slots).forEach(([key, slotOpts]) => {
    const slot = useGroup(slotOpts);

    if (content[key]) {
      useNestable(slot, content[key]);
    }

    parent.add(slot);
  });
}
