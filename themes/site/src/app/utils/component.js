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
