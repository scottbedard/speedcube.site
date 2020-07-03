import { Group, Object3D } from 'three';
import { useNestable } from './useNestable';
import { usePosition } from './usePosition';
import { useRotation } from './useRotation';
import { IncompleteVector, PossiblyReactive } from './types';

/**
 * Use group options.
 */
export type UseGroupOptions = {
  name?: string;
  position?: PossiblyReactive<IncompleteVector>;
  rotation?: PossiblyReactive<IncompleteVector>;
};

/**
 * Use group
 */
export function useGroup(
  opts: UseGroupOptions = {},
  children: Object3D|Object3D[] = new Object3D(),
) {
  const group = new Group();

  if (opts.name) {
    group.name = opts.name;
  }

  useNestable(group, children);
  usePosition(group, opts.position);
  useRotation(group, opts.rotation);

  return group;
}
