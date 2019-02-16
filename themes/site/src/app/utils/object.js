import { cloneDeep } from 'lodash-es';

/**
 * Safely convert a json to an object.
 *
 * @param  {string|Object} json
 * @param  {string|Object} defaultValue
 * @return {Object}
 */
export function jsonToObject(json, defaultValue = '{}') {
    // if json is already an object return a clone
    if (typeof json === 'object') {
        return cloneDeep(json);
    }

    // otherwise attempt to parse the json
    try {
        return JSON.parse(json);
    } catch (e) {
        /* esling-disable no-empty */
    }

    // if json parsing failed, repeat with our default value
    return jsonToObject(defaultValue);
}
