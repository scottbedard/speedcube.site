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
