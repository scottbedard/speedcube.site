import { rafEase } from './function';

/**
 * Find an ancestor component.
 *
 * @param  {Vue}            vm
 * @param  {string}         ancestorName
 * @return {Vue|undefined}
 */
export function findAncestor(vm, ancestorName) {
    let parent = vm.$parent;

    while (parent) {
        if (parent.$options.name === ancestorName) {
            return parent;
        }

        parent = parent.$parent;
    }

    return undefined;
}

/**
 * Component managed requestAnimationFrame easing loop.
 *
 * @param {Vue}             vm
 * @param {Function}        fn
 * @param {Number}          duration
 * @param {Array<Number>}   curve
 */
export function componentRafEase(vm, fn, duration, curve) {
    const loop = rafEase(fn, duration, curve);

    vm.$once('hook:destroyed', loop.cancel);

    return loop;
}

/**
 * Component managed requestAnimationFrame loop.
 *
 * @param  {Vue}        vm
 * @param  {Function}   fn
 * @return {Object}
 */
export function componentRafLoop(vm, fn) {
    let running = true;

    const tick = () => {
        if (running) {
            fn(window.requestAnimationFrame(tick));
        }
    };

    const start = () => {
        running = true;
        window.requestAnimationFrame(tick);
    };

    const stop = () => {
        running = false;
    };

    vm.$once('hook:destroyed', stop);

    start();

    return { start, stop };
}
