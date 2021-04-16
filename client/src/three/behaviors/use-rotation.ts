import { degreesToRadians } from '@/app/utils'
import { Object3D, Quaternion, Vector3 } from 'three'
import { PropType, watchEffect } from 'vue'

type Rotation = [number, number, number, number]

export const useRotationProp = {
  default: () => [0, 0, 0, 0],
  type: [Array, Object] as PropType<Rotation | Quaternion>,
}

/**
 * Set object rotation by axis angle and degrees
 */
 export function useRotation(obj: Object3D, rotation: () => Rotation | Quaternion | undefined | null) {
  watchEffect(() => {
    const r = rotation();

    if (r instanceof Quaternion) {
      obj.setRotationFromQuaternion(r);
    } else if (Array.isArray(r)) {
      const [x, y, z, deg] = r;

      obj.setRotationFromQuaternion(
        new Quaternion().setFromAxisAngle(
          new Vector3(x, y, z).normalize(), -degreesToRadians(deg),
        ),
      );
    } else {
      obj.setRotationFromQuaternion(new Quaternion());
    }
  });
}