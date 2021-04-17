import { EdgesGeometry, ShapeBufferGeometry } from 'three'
import { MaybeRef } from '@vueuse/core'
import { computed, unref, watch } from 'vue'
import { useDisposable } from './use-disposable'

/**
 * Create edges geometry around a shape
 */
export function useEdgesGeometry(geometry: MaybeRef<ShapeBufferGeometry>) {
  const edgesGeometry = computed(() => new EdgesGeometry(unref(geometry)))

  watch(edgesGeometry, (current, prev) => prev.dispose())

  useDisposable(edgesGeometry)

  return edgesGeometry
}
