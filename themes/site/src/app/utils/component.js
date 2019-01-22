import { isUndefined } from 'lodash-es';

/**
 * Bind an external event to a component.
 *
 * @param  {Vue}            vm
 * @param  {HTMLElement}    target
 * @param  {...any}         options
 * @return {void}
 */
export function bindExternalEvent(vm, target, ...options) {
    target.addEventListener(...options);

    vm.$on('hook:destroyed', () => target.removeEventListener(...options));
}

/**
 * Create an interval that is cleaned up when the vm is destroyed.
 *
 * @param {Vue}         vm
 * @param {Function}    callback
 * @param {number}      timeout
 */
export function cleanInterval(vm, callback, timeout) {
    const intervalId = setInterval(callback, timeout);

    vm.$once('hook:destroyed', () => clearInterval(intervalId));

    return intervalId;
}

/**
 * Create a timeout that is cleaned up when the vm is destroyed.
 *
 * @param  {Vue}        vm
 * @param  {Function}   callback
 * @param  {number}     timeout
 * @return {void}
 */
export function cleanTimeout(vm, callback, timeout) {
    // set a clean timeouts container, and bind an event
    // to the component to clear them our on destroy
    if (isUndefined(vm.$options._cleanTimeouts)) {
        vm.$options._cleanTimeouts = [];
        vm.$once('hook:destroyed', () => clearCleanTimeouts(vm));
    }

    // wrap the timed our callback and keep track of if with
    // a unique key. we'll use the key to clear the timeout
    // when our component is destroyed.
    const key = {};
    
    const timeoutId = window.setTimeout(() => {
        callback();

        const index = vm.$options._cleanTimeouts.findIndex(obj => obj.key === key);

        if (index !== -1) {
            vm.$options._cleanTimeouts.splice(index, 1);
        }
    }, timeout);

    // push the timeout reference onto our array of clean timeouts
    vm.$options._cleanTimeouts.push({ key, timeoutId });
}

/**
 * Manually clear any clean timeouts a component has queued.
 * 
 * @param  {Vue} vm
 * @return {void}
 */
export function clearCleanTimeouts(vm) {
    if (Array.isArray(vm.$options._cleanTimeouts)) {
        vm.$options._cleanTimeouts.forEach(obj => window.clearTimeout(obj.timeoutId));

        delete vm.$options._cleanTimeouts;
    }
}

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
