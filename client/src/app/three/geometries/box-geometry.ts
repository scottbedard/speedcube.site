import { Group } from 'three';
import { useAxesHelper } from '@/app/three/utils/axes-helper';
import { usePosition } from '@/app/three/utils/position';
import { useNestable } from '@/app/three/utils/nestable';

interface BoxGeometryOptions {
  size: {
    height: number
    width: number
    depth: number
  }
}

/**
 * Box geometry
 */
export function useBoxGeometry(opts: BoxGeometryOptions) {
  const geometry = new Group();

  const halfHeight = opts.size.height / 2;
  const halfWidth = opts.size.width / 2;
  const halfDepth = opts.size.depth / 2;

  const top = useAxesHelper();
  const left = useAxesHelper();
  const front = useAxesHelper();
  const right = useAxesHelper();
  const back = useAxesHelper();
  const bottom = useAxesHelper();

  usePosition(top, { y: halfHeight });
  usePosition(left, { x: -halfWidth });
  usePosition(front, { z: halfDepth });
  usePosition(right, { x: halfWidth });
  usePosition(back, { z: -halfDepth });
  usePosition(bottom, { y: -halfHeight });

  useNestable(geometry, [
    top, left, front, right, back, bottom
  ]);

  return geometry;
}
