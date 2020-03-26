import { isFunction } from 'lodash-es';
import { onUnmounted } from '@vue/composition-api';

/**
 * Dispose of an object on unmount.
 *
 * @param {Object[]} args
 *
 * @return {void}
 */
export function useDisposable(...args) {
    onUnmounted(() => {
        args.forEach((obj) => {
            if (isFunction(obj.dispose)) {
                obj.dispose();
            } else {
                console.error('Attempting to dispose non-disposable object', obj);
            }
        });
    });
}
