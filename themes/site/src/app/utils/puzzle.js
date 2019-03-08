/**
 * Helper to test if a puzzle is a cube.
 *
 * @param  {String}     puzzle
 * @return {Boolean}
 */
export function isCube(puzzle) {
    // this regex will match any NxN puzzle id
    return /^(\d+)x\1$/.test(puzzle);
}

/**
 * Test if a string is a valid cube turn.
 *
 * @param  {String} turn
 * @return {Boolean}
 */
export function isCubeTurn(turn) {
    return /^(?:(\d*[ULFRBD]w?)|([XYZ])){1}[-'2]?$/.test(turn);
}
