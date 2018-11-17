import {
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    Shape,
    ShapeBufferGeometry,
} from 'three';

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
 * Convert radians to degrees.
 *
 * @param  {number} degrees
 * @return {number}
 */
export function radToDeg(radians) {
    return radians * (180 / Math.PI);
}

/**
 * Create rounded-rectangle meshes.
 * 
 * @param  {number}         size    dimensions of the sticker
 * @param  {number}         radius  corner radius
 * @param  {number|string}  color   hex color value
 * @return {Mesh}
 */
export function sticker(size, radius, color) {
    const shape = new Shape();
    const offset = (size / 2) * -1;
    const offsetSize = offset + size;

    shape.moveTo(offset, offset + radius);
    shape.lineTo(offset, offsetSize - radius);
    shape.quadraticCurveTo(offset, offsetSize, offset + radius, offsetSize);
    shape.lineTo(offsetSize - radius, offsetSize);
    shape.quadraticCurveTo(offsetSize, offsetSize, offsetSize, offsetSize - radius);
    shape.lineTo(offsetSize, offset + radius );
    shape.quadraticCurveTo(offsetSize, offset, offsetSize - radius, offset);
    shape.lineTo(offset + radius, offset);
    shape.quadraticCurveTo(offset, offset, offset, offset + radius);

    return new Mesh(
        new ShapeBufferGeometry(shape), 
        new MeshBasicMaterial({ color, side: DoubleSide }),
    );
}
