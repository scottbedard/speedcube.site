import { Object3D } from 'three';
import { computed, watch } from '@vue/composition-api';
import { normalizeVector } from './helpers';

/**
 * Sync an object's position.
 */
export function usePosition(obj: Object3D, position: Record<string, number>) {
  const normalizedPosition = computed(() => normalizeVector(position));

  watch(normalizedPosition, ({ x, y, z }) => {
    obj.position.set(x, y, z);
  }, {
    deep: true,
  });
}
