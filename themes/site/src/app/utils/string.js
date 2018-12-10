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

/**
 * Format a time value.
 *
 * @param {number} time 
 * @return {string}
 */
export function formatTime(time) {
    const min = Math.floor(time / 60000);
    const sec = (Math.floor(time / 1000) % 60).toString().padStart(2, '0');
    const ms = (time % 1000).toString().padStart(2, '0').slice(0, 2);

    return `${min}:${sec}.${ms}`;
}

/**
 * Format a time value, showing minutes only if necessary.
 * 
 * @param {number} time 
 * @return {string}
 */
export function formatShortTime(time) {
    const formattedTime = formatTime(time);

    return formattedTime.startsWith('0:')
        ? formattedTime.slice(2)
        : time;
}