import { CircleGeometry } from 'three';
import { degreesToRadians } from './number';

/**
 * Create a regular polygon geometry.
 *
 * @param {number} radius   the radius of the polygon
 * @param {number} sides    number of sides
 *
 * @return {CircleGeometry}
 */
export function polygon(radius, sides) {
    const thetaStart = degreesToRadians(90); // <- start at 12'oclock
    const thetaLength = Math.PI * -2; // <- draw vertices clockwise

    return new CircleGeometry(radius, sides, thetaStart, thetaLength);
}
