/**
 * Test if two arrays have the same members.
 *
 * @param {any[]} arr1
 * @param {any[]} arr2
 *
 * @return {boolean}
 */
export function hasSameMembers(arr1, arr2) {
    return arr1.filter(x => arr2.includes(x)).length === arr2.length;
}
