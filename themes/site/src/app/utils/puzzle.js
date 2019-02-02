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
