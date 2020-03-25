/* eslint-disable no-use-before-define */
import { isFunction, isPlainObject } from 'lodash-es';
import { onMounted, onUnmounted, watch } from '@vue/composition-api';
import { degreesToRadians } from '@/app/utils/number';
import { stubVector } from '@/app/utils/object';

/**
 * Three positioning.
 *
 * @const {Object}
 */
export const threePositionProp = {
    position: {
        default: stubVector,
        type: Object,
    },
};

/**
 * Three rotation.
 *
 * @const {Object}
 */
export const threeRotationProp = {
    rotation: {
        default: stubVector,
        type: Object,
    },
};

/**
 * Three scaling.
 *
 * @const {Object}
 */
export const threeScaleProp = {
    scale: {
        default: stubVector,
        type: Object,
    },
};

/**
 * Common three props.
 *
 * @const {Object}
 */
export const threeProps = {
    ...threePositionProp,
    ...threeRotationProp,
    ...threeScaleProp,
};

/**
 * Dispose three objects when a component is destroyed.
 *
 * @param  {Object3D[]} args
 *
 * @return {void}
 */
export function useDisposable(...args) {
    onUnmounted(() => args.forEach((obj) => {
        if (isFunction(obj.dispose)) {
            obj.dispose();
        } else {
            console.error('Attempted to dispose non-disposable object', obj);
        }
    }));
}

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

    if (isPlainObject(options.position)) {
        watch(() => options.position, setLocalPosition, { deep: true });
    }

    if (isPlainObject(options.rotation)) {
        watch(() => options.rotation, setLocalRotation, { deep: true });
    }

    if (isPlainObject(options.scale)) {
        watch(() => options.scale, setLocalScale, { deep: true });
    }

    return {
        addToParentObj,
        findParentObj,
        getThreeObj,
        removeFromParentObj,
        setLocalPosition,
        setLocalRotation,
        setLocalScale,
    };
}
