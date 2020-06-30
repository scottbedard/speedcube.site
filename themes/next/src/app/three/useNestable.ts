import { Object3D } from 'three';
import { watch } from '@vue/composition-api';

/**
 *
 */
export function useNestable(parent: Object3D, childrenFn: () => Object3D[]) {
  let children = childrenFn().slice(0);

  parent.add(...children);

  watch(childrenFn, (newChildren) => {
    // add new children
    newChildren
      .filter((obj) => !children.includes(obj))
      .forEach((obj) => parent.add(obj));

    // remove old children
    children
      .filter((obj) => !newChildren.includes(obj))
      .forEach((obj) => parent.remove(obj));

    children = newChildren.slice(0);
  });
}
