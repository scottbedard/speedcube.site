/* eslint-disable comma-dangle */
/* eslint-disable no-use-before-define */
import { intersect as mathIntersect } from 'mathjs';

import {
    CircleGeometry,
    QuadraticBezierCurve3,
    Shape,
    ShapeBufferGeometry,
    Vector3,
} from 'three';

import { degreesToRadians } from './number';

/**
 * Gather an array of points.
 *
 * @param  {...[Vector3, Vector3, number]} args
 *
 * @return {Vector3[]}
 */
export function gatherPoints(...points) {
    return points.map(([a, b, percentage]) => midpoint(a, b, percentage));
}

/**
 * Calculate the intersection of lines A and B.
 *
 * @param {Vector3|object} a1
 * @param {Vector3|object} a2
 * @param {Vector3|object} b1
 * @param {Vector3|object} b2
 *
 * @return {Vector3|null}
 */
export function intersect(a1, a2, b1, b2) {
    const coords = mathIntersect(
        [a1.x, a1.y], [a2.x, a2.y],
        [b1.x, b1.y], [b2.x, b2.y],
    );

    return Array.isArray(coords) ? new Vector3(...coords) : null;
}

/**
 * Calculate the midpoint between two vectors.
 *
 * @param {object|Vector3}  a
 * @param {object|Vector3}  b
 * @param {number}          percentage
 *
 * @return {Vector3}
 */
export function midpoint(a, b, percentage = 0.5) {
    return new Vector3().lerpVectors(a, b, percentage);
}

/**
 * Calculate an explicit distance between two vectors.
 *
 * @param {object|Vector3}  a
 * @param {object|Vector3}  b
 * @param {number}          distance
 *
 * @return {Vector3}
 */
export function midpointDistance(a, b, distance) {
    a = vector(a);
    b = vector(b);

    return midpoint(a, b, distance / a.distanceTo(b));
}

/**
 * Create a regular polygon geometry.
 *
 * @param {number} radius   the radius of the polygon
 * @param {number} n        number of sides
 *
 * @return {CircleGeometry}
 */
export function polygon(radius, n) {
    const thetaStart = degreesToRadians(90); // <- start at 12'oclock
    const thetaLength = Math.PI * -2; // <- draw vertices clockwise

    return new CircleGeometry(radius, n, thetaStart, thetaLength);
}

/**
 * Create a shape, and set the position as a straight line
 * from the origin to the first vertice. This is useful
 * with the face component to space stickers apart.
 *
 * @param {Vector3[]}   vertices
 *
 * @return {Object}
 */
export function positionedShape(vertices, radius) {
    const dist = new Vector3().sub(vertices[0]);

    const position = new Vector3();
    position.add(vertices[0]);

    const geometry = shape(vertices, radius);
    geometry.translate(dist.x, dist.y, dist.z);

    return { geometry, position };
}

/**
 * Create a shape from an array of points
 *
 * @param {Vector3[]}   points
 * @param {number}      radius
 *
 * @return {ShapeBufferGeometry}
 */
export function shape(points, radius = 0, maxCurve = 0) {
    const obj = new Shape();

    const pointData = (i) => {
        const point = points[i] || points[0];
        const nextPoint = points[i + 1] || points[0];
        const dist = point.distanceTo(nextPoint);

        const rad = maxCurve ? Math.min(maxCurve, dist * radius) : dist * radius;

        return {
            start: midpointDistance(point, nextPoint, rad),
            end: midpointDistance(point, nextPoint, dist - rad),
        };
    };

    for (let i = 0; i < points.length; i += 1) {
        // draw the straight portion of the line
        const { start: currentStart, end: currentEnd } = pointData(i);

        if (i === 0) {
            obj.moveTo(currentStart.x, currentStart.y);
        } else {
            obj.lineTo(currentStart.x, currentStart.y);
        }

        obj.lineTo(currentEnd.x, currentEnd.y);

        // draw a curve to the start of the next line
        if (radius) {
            const point = points[i + 1] || points[0];
            const { start: nextStart } = pointData(i + 1 === points.length ? 0 : i + 1);

            new QuadraticBezierCurve3(currentEnd, point, nextStart)
                .getPoints(15)
                .forEach(p => obj.lineTo(p.x, p.y));
        }
    }

    return new ShapeBufferGeometry(obj);
}

/**
 * Normalize a vector.
 *
 * @param {object|Vector3}  obj
 *
 * @return {Vector3}
 */
export function vector(obj) {
    return obj.isVector3 ? obj : new Vector3(obj.x, obj.y, obj.z);
}
