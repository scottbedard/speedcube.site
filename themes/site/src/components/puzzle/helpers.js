/**
 * Convert degrees to radians.
 *
 * @param  {number} degrees
 * @return {number}
 */
export function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Determine what column a sticker is part of.
 *
 * @param  {number} size
 * @param  {number} index
 * @return {number}
 */
export function getCol(size, index) {
    return index % size;
}

/**
 * Determine what row a sticker is part of.
 *
 * @param  {number} size
 * @param  {number} index
 * @return {number}
 */
export function getRow(size, index) {
    return Math.floor(index / size);
}

/**
 * Convert radians to degrees.
 *
 * @param  {number} degrees
 * @return {number}
 */
export function radToDeg(radians) {
    return radians * (180 / Math.PI);
}
