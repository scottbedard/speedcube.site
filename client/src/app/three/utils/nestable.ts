import { isArray } from 'lodash-es';
import { Object3D } from 'three';

/**
 * Nestable 3D objects
 */
export function useNestable(parent: Object3D, children: Object3D | Object3D[]) {
  if (!children) {
    return;
  }

  if (!isArray(children)) {
    children = [children];
  }

  children.forEach((child) => parent.add(child));
}