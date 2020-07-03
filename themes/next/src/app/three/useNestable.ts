/* eslint-disable no-param-reassign */
import { isArray } from 'lodash-es';
import { Object3D } from 'three';
import { Nestable } from './types';

/**
 * Nestable
 */
export function useNestable(parent: Object3D, children: Nestable) {
  if (!children) {
    return;
  }

  if (!isArray(children)) {
    children = [children];
  }

  children.forEach((child) => parent.add(child));
}
