/**
 * Test if a string is a valid email address.
 *
 * @param   {string}    str
 * @return  {boolean}
 */
export function isEmail(str) {
    // @todo: remove useless escapes from this regex
    /* eslint-disable no-useless-escape */
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
    /* eslint-enable no-useless-escape */
}
