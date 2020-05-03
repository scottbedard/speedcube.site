import { clamp } from 'lodash-es';
import { CircleGeometry, Shape, ShapeBufferGeometry } from 'three';
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

/**
 * Create a rounded rectangle geometry.
 *
 * @param  {Number}                 height
 * @param  {Number}                 width
 * @param  {Number}                 radius
 * @return {ShapeBufferGeometry}
 */
export function roundedRectangle(height, width, radius = 0) {
    const shape = new Shape();

    height *= 0.5;
    width *= 0.5;
    radius = Math.min(height, width) * clamp(radius, 0, 1);

    shape.lineTo(width - radius, height);

    if (radius) {
        shape.quadraticCurveTo(width, height, width, height - radius);
    }

    shape.lineTo(width, -height + radius);

    if (radius) {
        shape.quadraticCurveTo(width, -height, width - radius, -height);
    }

    shape.lineTo(-width + radius, -height);

    if (radius) {
        shape.quadraticCurveTo(-width, -height, -width, -height + radius);
    }

    shape.lineTo(-width, height - radius);

    if (radius) {
        shape.quadraticCurveTo(-width, height, -width + radius, height);
    }

    shape.lineTo(width - radius, height);

    return new ShapeBufferGeometry(shape);
}

/**
 * Helper to create a rounded square geometry.
 *
 * @param  {Number}                 size
 * @param  {Number}                 radius
 * @return {ShapeBufferGeometry}
 */
export function roundedSquare(size, radius) {
    return roundedRectangle(size, size, radius);
}
