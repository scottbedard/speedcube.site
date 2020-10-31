import { onUnmounted, Ref, unref } from 'vue';

interface Disposable {
  dispose: Function,
}

/**
 * Disposable
 */
export function useDisposable(obj: Disposable | Ref<Disposable>) {
  onUnmounted(() => unref(obj).dispose());
}