import {
  BoxBufferGeometry, MeshLambertMaterial, Mesh,
} from 'three';
import {
  IncompleteVector, Nestable, PossiblyReactive, Reactive,
} from '../types';
import { useDisposable } from '../useDisposable';
import { useGroup } from '../utils/useGroup';
import { useHidden } from '../useHidden';
import { usePosition } from '../usePosition';
import { useRotation } from '../useRotation';
import { useSlots } from '../useSlots';

/**
 * Options
 */
export type UseBoxOptions = {
  color?: number;
  debug?: number;
  depth?: number;
  height?: number;
  hidden?: PossiblyReactive<boolean>;
  position?: Reactive<IncompleteVector>;
  rotation?: Reactive<IncompleteVector>;
  width?: number;
}

/**
 * Slots
 */
export type UseBoxSlots = {
  u?: Nestable;
  l?: Nestable;
  f?: Nestable;
  r?: Nestable;
  b?: Nestable;
  d?: Nestable;
};

/**
 * Box
 */
export function useBox(opts: UseBoxOptions = {}, slots: UseBoxSlots = {}) {
  const color = opts.color || 0xfffffff;
  const debug = opts.debug || false;
  const depth = opts.depth || 0;
  const height = opts.height || 0;
  const width = opts.width || 0;

  const group = useGroup();

  // debug wireframe
  if (debug) {
    const geometry = new BoxBufferGeometry(width, height, depth);
    const material = new MeshLambertMaterial({ color, wireframe: true });
    const box = new Mesh(geometry, material);

    group.add(box);

    useDisposable(geometry);
    useDisposable(material);
  }

  useHidden(group, opts.hidden);
  usePosition(group, opts.position);
  useRotation(group, opts.rotation);

  // slots
  useSlots(group, {
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

  return group;
}
