/* eslint-disable */
import { isArray } from 'lodash-es';
import { Object3D } from 'three';

/**
 *
 */
export function useNestable(parent: Object3D, children: Object3D|Object3D[]) {
  if (!isArray(children)) {
    children = [children];
  }

  children.forEach(child => parent.add(child));
}
