import { Group, Object3D } from 'three';
import { computed, Ref } from '@vue/composition-api';
import { useNestable } from './useNestable';
import { usePosition } from './usePosition';
import { RawVectorObject } from './types';

/**
 * Use group options.
 */
export type UseGroupOptions = {
  name?: Ref<string>;
  position?: Ref<RawVectorObject>;
};

/**
 * Group
 */
export function useGroup(
  opts: UseGroupOptions = {},
  children: Object3D|Object3D[],
) {
  const group = new Group();

  if (opts.name) {
    group.name = opts.name.value;
  }

  useNestable(group, children);
  usePosition(group, computed(() => opts.position?.value || {}));

  return group;
}
