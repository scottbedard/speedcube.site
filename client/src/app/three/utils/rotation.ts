import { Object3D, Quaternion } from 'three';

export function useRotation(obj: Object3D, quaternion: Quaternion) {
  obj.setRotationFromQuaternion(quaternion);
}
