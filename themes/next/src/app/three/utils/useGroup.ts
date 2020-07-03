import { Group, Object3D } from 'three';
import { useHidden } from '../useHidden';
import { useNestable } from '../useNestable';
import { usePosition } from '../usePosition';
import { useRotation } from '../useRotation';
import { IncompleteVector, Nestable, PossiblyReactive } from '../types';

/**
 * Use group options.
 */
export type UseGroupOptions = {
  hidden?: PossiblyReactive<boolean>;
  name?: string;
  position?: PossiblyReactive<IncompleteVector>;
  rotation?: PossiblyReactive<IncompleteVector>;
};

/**
 * Use group
 */
export function useGroup(
  opts: UseGroupOptions = {},
  children: Nestable = new Object3D(),
) {
  const group = new Group();

  if (opts.name) {
    group.name = opts.name;
  }

  useHidden(group, opts.hidden);
  usePosition(group, opts.position);
  useRotation(group, opts.rotation);
  useNestable(group, children);

  return group;
}
