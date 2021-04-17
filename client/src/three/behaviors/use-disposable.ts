import { onUnmounted, unref } from 'vue'
import { MaybeRef } from '@vueuse/core'

interface Disposable {
  dispose: Function,
}

/**
 * Disposable
 */
export function useDisposable(obj: MaybeRef<Disposable>) {
  onUnmounted(() => unref(obj).dispose())
}
