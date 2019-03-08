import {
    isBoolean,
    isNumber,
    isString,
} from 'lodash-es';

import { isEmail, isJson } from './string';

/**
 * Email.
 *
 * @param  {object}             data
 * @param  {string}             key
 * @return {Boolean}
 */
export function email(data, key) {
    const value = data[key];

    return isString(value) && isEmail(value);
}

/**
 * Json.
 *
 * @param  {object}             data
 * @param  {string}             key
 * @return {Boolean}
 */
export function json(data, key) {
    const value = data[key];

    return isString(value) && isJson(value);
}

/**
 * Require.
 *
 * @param  {object}             data
 * @param  {string}             key
 * @return {Boolean|Promise}
 */
export function required(data, key) {
    const value = data[key];

    return (isBoolean(value) && value)
        || (isString(value) && value.length > 0)
        || (isNumber(value) && value);
}

/**
 * Same As.
 *
 * @param  {object}             data
 * @param  {string}             key
 * @return {Boolean|Promise}
 */
export function sameAs(data, key, params) {
    const value = data[key];
    const otherValue = data[params[0]];

    return value === otherValue;
}
