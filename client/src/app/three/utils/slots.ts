import { Group, Object3D, Quaternion } from 'three';
import { useNestable } from '@/app/three/utils/nestable';
import { usePosition } from '@/app/three/utils/position';
import { useRotation } from '@/app/three/utils/rotation';
import { Vector } from '@/app/three/types';

interface SlotLocation {
  position?: Partial<Vector>,
  rotation?: Quaternion,
}

/**
 * Geometry slots
 */
export function useSlots(
  parent: Object3D,
  slotLocations: Record<string, SlotLocation>,
  slotContent: Record<string, Object3D | Object3D[] | undefined> | undefined,
) {
  if (slotContent) {
    for (const key in slotContent) {
      const content = slotContent[key];
      const location = slotLocations[key];

      if (content && location) {
        const slot = new Group();
        useNestable(parent, slot);
        useNestable(slot, content);

        if (location.position) {
          usePosition(slot, location.position);
        }

        if (location.rotation) {
          useRotation(slot, location.rotation);
        }
      }
    }
  }
}
