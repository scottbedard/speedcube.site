/**
 * Convert degrees to radians.
 *
 * @param  {Number} degrees
 * @return {Number}
 */
export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Format milliseconds to a human-readable string.
 *
 * @param  {number} time
 * @param  {string}
 */
export function formatSolveTime(time) {
    const sec = Math.floor(time / 1000);
    const ms = Math.floor((time - (sec * 1000)) / 10);

    if (sec > 60) {
        const min = Math.floor(sec / 60);

        return `${min}:${String(sec % 60).padStart(2, 0)}.${ms}`;
    }

    return `${sec}.${ms}`;
}

/**
 * Prevent a value from being negative.
 *
 * @param {Number} value
 *
 * @return {Number}
 */
export function greaterThanZero(value) {
    return Math.max(Number.EPSILON, value);
}
