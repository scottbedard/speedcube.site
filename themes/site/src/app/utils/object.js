/**
 * Convert json to an object.
 * 
 * @param  {string|Object} json
 * @return {Object}
 */
export function jsonToObject(json) {
    return typeof json === 'string' ? JSON.parse(json) : json;
}
