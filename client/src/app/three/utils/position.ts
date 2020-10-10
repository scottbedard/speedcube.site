import { Object3D } from 'three';
import { Vector } from '@/app/three/types';
import { watchEffect } from 'vue';

/**
 * Set an objects position from a vector
 */
export function usePosition(obj: Object3D, position: Partial<Vector>) {
  watchEffect(() => {
    obj.position.x = position.x || 0;
    obj.position.y = position.y || 0;
    obj.position.z = position.z || 0;
  });
}
