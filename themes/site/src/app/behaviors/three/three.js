/* eslint-disable no-use-before-define */
import { isFunction } from 'lodash-es';
import { onMounted, onUnmounted, watch } from '@vue/composition-api';
import { degreesToRadians } from '@/app/utils/number';

/**
 * Core three behavior.
 *
 * @return {Object}
 */
export function useThree(obj, options = {}) {
    const context = options.context || {};

    //
    // functions
    //

    /**
     * Add to the parent three object.
     *
     * @return {void}
     */
    function addToParentObj() {
        const parent = findParentObj();

        if (parent) {
            parent.add(obj);
        }
    }

    /**
     * Find the parent three object.
     *
     * @return {Object3D|null}
     */
    function findParentObj() {
        let { parent } = context;

        while (parent) {
            if (isFunction(parent.getThreeObj)) {
                return parent.getThreeObj();
            }

            parent = parent.$parent;
        }

        return null;
    }

    /**
     * Get this component's three object.
     *
     * @return {Object3D}
     */
    function getThreeObj() {
        return obj;
    }

    /**
     * Remove from the parent three object.
     *
     * @return {void}
     */
    function removeFromParentObj() {
        const parent = findParentObj();

        if (parent) {
            parent.remove(obj);
        }
    }

    /**
     * Set local object position.
     *
     * @param {Object}  vector
     * @param {number?} vector.x
     * @param {number?} vector.y
     * @param {number?} vector.z
     *
     * @return {void}
     */
    function setLocalPosition({ x, y, z }) {
        obj.position.set(x || 0, y || 0, z || 0);
    }

    /**
     * Set local object rotation.
     *
     * @param {Object}  vector
     * @param {number?} vector.x
     * @param {number?} vector.y
     * @param {number?} vector.z
     *
     * @return {void}
     */
    function setLocalRotation({ x, y, z }) {
        obj.rotation.x = degreesToRadians(x || 0);
        obj.rotation.y = degreesToRadians(y || 0);
        obj.rotation.z = degreesToRadians(z || 0);

        if (isFunction(options.lookAt)) {
            const { x: lookX, y: lookY, z: lookZ } = options.lookAt();

            obj.lookAt(lookX, lookY, lookZ);
        }
    }

    /**
     * Set local object scale.
     *
     * @param {Object}  vector
     * @param {number?} vector.x
     * @param {number?} vector.y
     * @param {number?} vector.z
     *
     * @return {void}
     */
    function setLocalScale({ x, y, z }) {
        obj.scale.x = x || obj.scale.x;
        obj.scale.y = y || obj.scale.x;
        obj.scale.z = z || obj.scale.x;
    }

    /**
     * Set object name.
     *
     * @param {string} name
     *
     * @return {void}
     */
    function setName(name) {
        obj.name = name;
    }

    //
    // lifecycle
    //

    onMounted(() => {
        addToParentObj();
    });

    onUnmounted(() => {
        removeFromParentObj();
    });

    //
    // behavior
    //

    if (isFunction(options.name)) {
        watch(options.name, setName);
    }

    if (isFunction(options.position)) {
        watch(options.position, setLocalPosition, { deep: true });
    }

    if (isFunction(options.rotation)) {
        watch(options.rotation, setLocalRotation, { deep: true });
    }

    if (isFunction(options.scale)) {
        watch(options.scale, setLocalScale, { deep: true });
    }

    return {
        addToParentObj,
        findParentObj,
        getThreeObj,
        removeFromParentObj,
        setLocalPosition,
        setLocalRotation,
        setLocalScale,
        setName,
    };
}
