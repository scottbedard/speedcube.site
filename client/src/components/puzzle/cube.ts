import { Group } from 'three';
import { isInteger } from '@/app/utils/math';
// import { useAxesHelper } from '@/app/three/utils/axes-helper';
import { useBoxGeometry } from '@/app/three/geometries/box-geometry';
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
  // const origin = useAxesHelper();

  console.log('cube', opts);

  const cube = new Group();

  const geometry = useBoxGeometry({
    size: {
      depth: 100,
      height: 100,
      width: 100,
    },
  });

  useNestable(cube, [
    // origin,
    geometry,
  ]);

  return cube;
}
