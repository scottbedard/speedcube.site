import { isFunction } from 'lodash-es';
import { computed, watch } from '@vue/composition-api';
import { hexColorValue } from '@/app/utils/string';

/**
 * Lighting.
 *
 * @param {Light} light
 * @param {Object} options
 */
export function useLight(light, options = {}) {
    if (isFunction(options.color)) {
        const color = computed(() => hexColorValue(options.color()));
        watch(color, () => light.color.setHex(color.value));
    }

    if (isFunction(options.intensity)) {
        watch(options.intensity, (intensity) => {
            light.intensity = intensity;
        });
    }

    return light;
}
