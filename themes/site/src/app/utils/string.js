/**
 * Copy a string to the user's clipboard.
 * https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
 *
 * @param  {string} str     the string being copied
 * @return {void}
 */
export function copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';

    document.body.appendChild(el);

    const selection = document.getSelection();

    if (selection !== null) {
        const selected = selection.rangeCount > 0
            ? selection.getRangeAt(0)
            : false;

        el.select();

        document.execCommand('copy');
        document.body.removeChild(el);

        if (selected) {
            selection.removeAllRanges();
            selection.addRange(selected);
        }
    }
}

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

    return formattedTime.replace(/^[0:]*/, '');
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
