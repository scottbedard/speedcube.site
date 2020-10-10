import { Group } from 'three';
import { isInteger } from '@/app/utils/math';
import { useAxesHelper } from '@/app/three/utils/axes-helper';
import { useBoxGeometry } from '@/app/three/geometries/box-geometry';
import { useNestable } from '@/app/three/utils/nestable';

// size of cube inscribed in a sphere of radius 1
const edgeLength = 2 / Math.sqrt(3);

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

  console.log('cube', opts);

  const cube = new Group();

  const geometry = useBoxGeometry({
    size: {
      depth: edgeLength,
      height: edgeLength,
      width: edgeLength,
    },
    slots: {
      top: useAxesHelper(),
      left: useAxesHelper(),
      front: useAxesHelper(),
      right: useAxesHelper(),
      back: useAxesHelper(),
      down: useAxesHelper(),
    },
  });

  useNestable(cube, [
    // origin,
    geometry,
  ]);

  return cube;
}
