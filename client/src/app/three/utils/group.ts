import { Group, Object3D } from 'three';
import { useNestable } from '@/app/three/utils/nestable';
import { Vector } from '@/app/three/types';
// import { usePosition } from './position';

interface UseGroupOptions {
  position?: Partial<Vector>,
}

/**
 * Group
 */
export function useGroup(children: Object3D | Object3D[] = [], opts: UseGroupOptions = {}) {
  const group = new Group();

  useNestable(group, children);

  if (opts.position) {
    // usePosition(group, opts.position);
  }

  return group;
}
