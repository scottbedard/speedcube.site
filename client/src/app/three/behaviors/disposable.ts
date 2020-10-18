import { ComputedRef, isRef, onUnmounted } from 'vue';

interface Disposable {
  dispose: Function,
}

/**
 * Disposable
 */
export function useDisposable(obj: Disposable | ComputedRef<Disposable>) {
  onUnmounted(() => {
    if (isRef(obj)) {
      obj.value.dispose();
    } else {
      obj.dispose();
    }
  });
}