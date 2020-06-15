import { isFunction } from 'lodash-es';
import { onUnmounted } from '@vue/composition-api';

/**
 * Disposable
 */
type Disposable = {
  dispose: Function;
};

/**
 * Lazy disposable.
 */
type LazyDisposable = () => Disposable;

/**
 * Dispose of objects when a component unmounts.
 */
export function useDisposable(disposable: Disposable|LazyDisposable) {
  onUnmounted(() => {
    const obj = isFunction(disposable) ? disposable() : disposable;

    obj.dispose();
  });
}
