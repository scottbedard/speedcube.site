/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BoxBufferGeometry, MeshLambertMaterial, Mesh, Object3D,
} from 'three';
import { computed, watch } from '@vue/composition-api';
import { getValue } from '../helpers';
import { IncompleteVector, PossiblyReactive, Reactive } from '../types';
import { useDisposable } from '../useDisposable';
import { useGroup } from '../useGroup';
import { usePosition } from '../usePosition';
import { useSlots } from '../useSlots';

/**
 * Options
 */
export type UseBoxOptions = {
  color?: PossiblyReactive<number>;
  depth?: PossiblyReactive<number>;
  height?: PossiblyReactive<number>;
  position?: Reactive<IncompleteVector>;
  width?: PossiblyReactive<number>;
}

/**
 * Slots
 */
export type UseBoxSlots = {
  [key: string]: Object3D|Object3D[];
};

/**
 * Box
 */
export function useBox(opts: UseBoxOptions = {}, slots: UseBoxSlots = {}) {
  const color = computed(() => getValue(opts.color) || 0x00ff00);
  const depth = computed(() => getValue(opts.depth) || 0);
  const height = computed(() => getValue(opts.height) || 0);
  const width = computed(() => getValue(opts.width) || 0);

  const baseValues = {
    depth: depth.value,
    height: height.value,
    width: width.value,
  };

  // objects
  const geometry = new BoxBufferGeometry(width.value, height.value, depth.value);

  const material = new MeshLambertMaterial({
    color: color.value,
    opacity: 0.5,
    side: 2,
    transparent: false,
  });

  const box = new Mesh(geometry, material);

  // dimensions
  watch(width, () => box.scale.x = width.value / baseValues.width);
  watch(height, () => box.scale.y = height.value / baseValues.height);
  watch(depth, () => box.scale.z = depth.value / baseValues.depth);

  // position
  usePosition(box, opts.position);

  // slots
  const group = useGroup({
    position: opts.position,
  }, useGroup({
    position: computed(() => ({ y: height.value / 2 })),
  }, slots.u));

  box.children.push(group);

  // cleanup
  useDisposable(geometry);
  useDisposable(material);

  return box;
}
