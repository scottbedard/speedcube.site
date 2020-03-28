import { stubVector } from '@/app/utils/object';

/**
 * Common lighting props.
 *
 * @const {Object}
 */
export const lightProps = {
    color: {
        default: 0xffffff,
        type: [Number, String],
    },
    intensity: {
        default: 1,
        type: Number,
    },
};

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
export { useLight } from './light';
export { useThree } from './three';
