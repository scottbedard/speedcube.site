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
 * Test if a string is a valid json object.
 *
 * @param   {string}    str
 * @return  {boolean}
 */
export function isJson(jsonString) {
    try {
        const o = JSON.parse(jsonString);

        if (o && typeof o === 'object') {
            return true;
        }
    /* eslint-disable-next-line no-empty */
    } catch (e) {}

    return false;
}

/**
 * Format a time value.
 *
 * @param  {number|string} time
 * @return {string}
 */
export function formatTime(time) {
    time = Number(time);

    const min = Math.floor(time / 60000);
    const sec = (Math.floor(time / 1000) % 60).toString().padStart(2, '0');
    const ms = Math.floor((time % 1000) / 10).toString().padStart(2, '0');

    return `${min}:${sec}.${ms}`;
}

/**
 * Format a time value, showing minutes only if necessary.
 *
 * @param  {number} time
 * @return {string}
 */
export function formatShortTime(time) {
    const formattedTime = formatTime(time);

    return time >= 1000
        ? formattedTime.replace(/^[0:]*/, '')
        : formattedTime.replace(/^\d:0/, '');
}

/**
 * Format a time to be short sentence.
 *
 * @param  {number} time
 * @return {string}
 */
export function formatShortTimeSentence(time) {
    const shortTime = formatShortTime(time);
    const minutes = Math.floor(time / 60000);

    return minutes < 1
        ? `${shortTime} second`
        : `${shortTime} minute`;
}
