/* eslint-disable */
import { Group, Object3D } from 'three';
import { isInteger } from '@/app/utils/math';
import { ref } from 'vue';
import { useAxesHelper } from '@/app/three/utils/axes-helper';
import { useNestable } from '@/app/three/utils/nestable';

// normalize cube options
function normalize(opts: Record<string, any>) {
  if (!isInteger(opts.size) || opts.size < 2) {
    throw new Error('Cube size must be an integer greater than one');
  }

  return {
    size: opts.size,
  };
}

/**
 * Cube
 */
export function useCube(rawOpts: Record<string, any>) {
  const opts = normalize(rawOpts);
  const origin = useAxesHelper();

  const cube = new Group();

  useNestable(cube, [
    origin,
  ]);

  return cube;
}
