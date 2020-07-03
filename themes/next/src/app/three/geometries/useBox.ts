import {
  BoxBufferGeometry, MeshLambertMaterial, Mesh, Object3D,
} from 'three';
import { computed } from '@vue/composition-api';
import { getValue } from '../helpers';
import { IncompleteVector, PossiblyReactive, Reactive } from '../types';
import { useDisposable } from '../useDisposable';
import { usePosition } from '../usePosition';
import { useSlots } from '../useSlots';
import { useRotation } from '../useRotation';

/**
 * Options
 */
export type UseBoxOptions = {
  color?: PossiblyReactive<number>;
  depth?: number;
  height?: number;
  position?: Reactive<IncompleteVector>;
  rotation?: Reactive<IncompleteVector>;
  width?: number;
}

/**
 * Slots
 */
export type UseBoxSlots = Record<string, Object3D|Object3D[]>

/**
 * Box
 */
export function useBox(opts: UseBoxOptions = {}, slots: UseBoxSlots = {}) {
  const depth = opts.depth || 0;
  const height = opts.height || 0;
  const width = opts.width || 0;
  const color = computed(() => getValue(opts.color) || 0x00ff00);

  // objects
  const geometry = new BoxBufferGeometry(width, height, depth);

  const material = new MeshLambertMaterial({
    color: color.value,
    opacity: 0.5,
    side: 2,
    transparent: false,
    wireframe: true,
  });

  const box = new Mesh(geometry, material);

  // position & rotation
  usePosition(box, opts.position);
  useRotation(box, opts.rotation);

  // slots
  useSlots(box, {
    u: {
      position: { y: height / 2 },
      rotation: { x: -90 },
    },
    l: {
      position: { x: -width / 2 },
      rotation: { y: -90 },
    },
    f: {
      position: { z: depth / 2 },
    },
    r: {
      position: { x: width / 2 },
      rotation: { y: 90 },
    },
    b: {
      position: { z: -depth / 2 },
      rotation: { y: 180 },
    },
    d: {
      position: { y: -height / 2 },
      rotation: { x: 90 },
    },
  }, slots);

  // cleanup
  useDisposable(geometry);
  useDisposable(material);

  return box;
}
