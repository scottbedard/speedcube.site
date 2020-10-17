import { degreesToRadians } from '@/app/utils/math';
import { Object3D, Quaternion, Vector3 } from 'three';
import { watchEffect } from 'vue';

type Rotation = [number, number, number, number];

/**
 * Set object rotation by axis angle and degrees
 */
export function useRotation(obj: Object3D, rotation: () => Rotation) {
  watchEffect(() => {
    const [x, y, z, deg] = rotation();

    obj.setRotationFromQuaternion(
      new Quaternion().setFromAxisAngle(
        new Vector3(x, y, z).normalize(), -degreesToRadians(deg),
      ),
    );
  });
}
