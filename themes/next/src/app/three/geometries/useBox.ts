/* eslint-disable */
import { isUndefined, isNumber } from 'lodash-es';
import { BoxBufferGeometry, MeshLambertMaterial, Mesh } from 'three';
import { computed, Ref, watch, isRef, isReactive } from '@vue/composition-api';
import { getValue } from '../helpers';
import { useDisposable } from '../useDisposable';
import { usePosition } from '../usePosition';
import { RawVectorObject } from '../types';

export type UseBoxOptions = {
  depth?: number | Ref<number>;
  height?: number | Ref<number>;
  position?: Ref<RawVectorObject>;
  width?: number | Ref<number>;
}
/**
 * Box.
 */
export function useBox(opts: UseBoxOptions = {}) {
  const depth = computed(() => getValue(opts.depth) || 0);
  const height = computed(() => getValue(opts.height) || 0);
  const width = computed(() => getValue(opts.width) || 0);

  const geometry = new BoxBufferGeometry(width.value, height.value, depth.value);

  const baseValues = {
    depth: depth.value,
    height: height.value,
    width: width.value,
  };

  const material = new MeshLambertMaterial({
    color: 0xff0000,
    opacity: 0.5,
    side: 2,
    transparent: false,
  });

  const box = new Mesh(geometry, material);

  watch(width, () => box.scale.x = width.value / baseValues.width);
  watch(height, () => box.scale.y = height.value / baseValues.height);
  watch(depth, () => box.scale.z = depth.value / baseValues.depth);

  usePosition(box, opts.position);

  useDisposable(geometry);
  useDisposable(material);

  return box;
}
