import { degreesToRadians } from '@/app/utils/math';
import { Object3D, Quaternion, Vector3 } from 'three';
import { PropType, watchEffect } from 'vue';

export type Rotation = [number, number, number, number];

/**
 * Rotation prop
 */
export const rotationProp = {
  default: () => [0, 0, 0, 0],
  type: Array as unknown as PropType<[number, number, number, number]>,
};

/**
 * Set object rotation by axis angle and degrees
 */
export function useRotation(obj: Object3D, rotation: () => Rotation | Quaternion) {
  watchEffect(() => {
    const r = rotation();

    if (r instanceof Quaternion) {
      obj.setRotationFromQuaternion(r);
    } else {
      const [x, y, z, deg] = r;

      obj.setRotationFromQuaternion(
        new Quaternion().setFromAxisAngle(
          new Vector3(x, y, z).normalize(), -degreesToRadians(deg),
        ),
      );
    }
    
  });
}
