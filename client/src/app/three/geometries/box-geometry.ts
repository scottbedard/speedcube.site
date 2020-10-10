import { Group, Object3D } from 'three';
import { useSlots } from '@/app/three/utils/slots';

interface BoxGeometryOptions {
  size: {
    height: number,
    width: number,
    depth: number,
  },
  slots?: {
    top?: Object3D | Object3D[],
    left?: Object3D | Object3D[],
    front?: Object3D | Object3D[],
    right?: Object3D | Object3D[],
    back?: Object3D | Object3D[],
    down?: Object3D | Object3D[],
  },
}

/**
 * Box geometry
 */
export function useBoxGeometry(opts: BoxGeometryOptions) {
  const geometry = new Group();
  const halfHeight = opts.size.height / 2;
  const halfWidth = opts.size.width / 2;
  const halfDepth = opts.size.depth / 2;

  useSlots(geometry, {
    top: {
      position: { y: halfHeight },
    },
    left: {
      position: { x: -halfWidth },
    },
    front: {
      position: { z: halfDepth },
    },
    right: {
      position: { x: halfWidth },
    },
    back: {
      position: { z: -halfDepth },
    },
    down: {
      position: { y: -halfHeight },
    },
  }, opts.slots);

  return geometry;
}
