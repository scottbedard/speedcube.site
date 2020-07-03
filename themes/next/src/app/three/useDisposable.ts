import { isFunction } from 'lodash-es';
import { onUnmounted } from '@vue/composition-api';

type Disposable = {
  dispose: Function;
};

type LazyDisposable = () => Disposable;

/**
 * Disposable
 */
export function useDisposable(disposable: Disposable|LazyDisposable) {
  onUnmounted(() => {
    const obj = isFunction(disposable) ? disposable() : disposable;

    obj.dispose();
  });
}
