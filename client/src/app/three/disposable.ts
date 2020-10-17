import { onUnmounted } from 'vue';

interface Disposable {
  dispose: Function,
}

/**
 * Disposable
 */
export function useDisposable(obj: Disposable) {
  onUnmounted(() => obj.dispose());
}