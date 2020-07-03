import { Group, Object3D } from 'three';
import { useNestable } from './useNestable';
import { useObject } from './useObject';

export function useGroup(options: any = {}, children: Object3D|Object3D[]) {
  const group = new Group();

  useObject(group, options);

  useNestable(group, children);

  return group;
}
