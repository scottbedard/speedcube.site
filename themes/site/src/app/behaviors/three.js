import { get } from 'lodash-es';
import { computed, onMounted, onUnmounted, ref, watch } from '@vue/composition-api';

/**
 * The glue between Vue and Three
 *
 * @return {Object}
 */
export function useThree(obj, options = {}) {
    const parent = get(options, 'context.parent.threeObj');
    const threeObj = ref(obj);

    //
    // nesting
    //
    if (parent) {
        onMounted(() => parent.add(obj));
        onUnmounted(() => parent.remove(obj));
    }

    //
    // position
    //
    // const position = computed(() => ({
    //     x: 0, y: 0, z: 0, ...get(options, 'context.attrs.position', {}),
    // }));

    // const setPosition = (...args) => obj.position.set(...args);

    obj.position.set(0, 0, 0);

    // watch(position, () => setPosition(position.x, position.y, position.z));

    return {
        threeObj,
        // setPosition,
    };
}
