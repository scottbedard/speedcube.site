import { stubVector } from '@/app/utils/object';

/**
 * Name.
 *
 * @const {Object}
 */
export const threeNameProp = {
    name: {
        type: String,
    },
};

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
    ...threeNameProp,
    ...threePositionProp,
    ...threeRotationProp,
    ...threeScaleProp,
};

export { useDisposable } from './disposable';
export { useThree } from './three';
