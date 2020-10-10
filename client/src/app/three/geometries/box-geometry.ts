import { Group, Object3D, Quaternion, Vector3 } from 'three';
import { useSlots } from '@/app/three/utils/slots';
import { degreesToRadians } from '@/app/utils/math';

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
      rotation: new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -degreesToRadians(90)),
    },
    left: {
      position: { x: -halfWidth },
      rotation: new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), -degreesToRadians(90)),
    },
    front: {
      position: { z: halfDepth },
    },
    right: {
      position: { x: halfWidth },
      rotation: new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), degreesToRadians(90)),
    },
    back: {
      position: { z: -halfDepth },
      rotation: new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), degreesToRadians(180)),
    },
    down: {
      position: { y: -halfHeight },
      rotation: new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), degreesToRadians(90)),
    },
  }, opts.slots);

  return geometry;
}