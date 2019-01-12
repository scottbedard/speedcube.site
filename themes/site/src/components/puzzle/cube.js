import * as THREE from 'three';
import Cube from 'bedard-cube';
import { cleanTimeout } from '@/app/utils/component';

/**
 * Create 3d objects to represent each sticker.
 * 
 * @param  {Cube}   cube
 * @return {void}
 */
function attachStickers(cube) {
    const geometry = stickerGeometry(cube);

    cube.model.stickers(sticker => {
        sticker.display = new THREE.Object3D();
        sticker.display.name = 'sticker';

        const color = cube.config.colors[sticker.value];

        const outerMaterial = new THREE.MeshLambertMaterial({
            color,
            side: THREE.FrontSide,
        });

        const innerMaterial = new THREE.MeshLambertMaterial({
            color,
            opacity: cube.config.innerBrightness,
            side: THREE.BackSide,
            transparent: true,
        });

        const outerMesh = new THREE.Mesh(geometry, outerMaterial);
        const innerMesh = new THREE.Mesh(geometry, innerMaterial);

        sticker.display.add(outerMesh);
        sticker.display.add(innerMesh);
    });
}

/**
 * Convert degrees to radians.
 *
 * @param  {mumber} deg
 * @return {number}
 */
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Get the stickers that are effected by a specific turn.
 *
 * @param  {Object}         parsedTurn
 * @return {Array<Object>}
 */
function getStickersEffectedByTurn(cube, parsedTurn) {
    const stickers = [];

    // grab a couple of values we'll need to determine
    // which stickers are being effected by the turn
    const { colMap, cubeLayers, rowMap } = cube;
    const { depth, target, wide } = parsedTurn;
    const zeroDepth = depth - 1;
    const reverseDepth = cubeLayers - depth;

    // attach the entire face of wide turns
    if (wide || depth === 1) {
        stickers.push(...cube.model.state[target]);
    }

    // attach the entire opposide face of inner turns
    // that are greater than the total number of layers
    if (depth >= cubeLayers) {
        const opposite = { U: 'D', L: 'R', F: 'B', R: 'L', B: 'F', D: 'U' };

        stickers.push(...cube.model.state[opposite[target]]);
    }

    // get the slices being turned
    if (target === 'U') {
        stickers.push(
            ...cube.model.state.B.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.model.state.R.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.model.state.F.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.model.state.L.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
        );
    } else if (target === 'L') {
        stickers.push(
            ...cube.model.state.U.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.model.state.F.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.model.state.D.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.model.state.B.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (target === 'F') {
        stickers.push(
            ...cube.model.state.U.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.model.state.R.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.model.state.D.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.model.state.L.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (target === 'R') {
        stickers.push(
            ...cube.model.state.U.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
            ...cube.model.state.B.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.model.state.D.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
            ...cube.model.state.F.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (target === 'B') {
        stickers.push(
            ...cube.model.state.U.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.model.state.L.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.model.state.D.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.model.state.R.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (target === 'D') {
        stickers.push(
            ...cube.model.state.B.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.model.state.R.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.model.state.F.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.model.state.L.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
        );
    }

    return stickers;
}

/**
 * Get the axis and rotation of a turn.
 * 
 * @param  {Cube}   cube
 * @param  {Object} parsedTurn
 * @return {Array}
 */
export function getTurnAxisAndDegrees(parsedTurn) {
    const { target, rotation } = parsedTurn;
    let axis, degrees;

    // helper function to get turn degrees. note that the
    // clockwise / counter-clickwise degrees might seem
    // backwards. this is because we're turning from the
    // context of our scene's world axis, not the face.
    const deg = (cw, ccw) => rotation === 2 ? 180 : (rotation === -1 ? ccw : cw);

    if (['X', 'Y', 'Z'].includes(target)) {
        axis = target.toLowerCase();
        degrees = deg(-90, 90);
    } else {
        if (target === 'U') {
            axis = 'y';
            degrees = deg(-90, 90);
        } else if (target === 'L') {
            axis = 'x';
            degrees = deg(90, -90);
        } else if (target === 'F') {
            axis = 'z';
            degrees = deg(-90, 90);
        } else if (target === 'R') {
            axis = 'x';
            degrees = deg(-90, 90);
        } else if (target === 'B') {
            axis = 'z';
            degrees = deg(90, -90);
        } else if (target === 'D') {
            axis = 'y';
            degrees = deg(90, -90);
        }  
    }

    return { axis, degrees };
}

/**
 * Position the stickers.
 * 
 * @param  {Cube}       cube
 * @param  {boolean}    initial     
 * @return {void}
 */
function positionStickers(cube, initial = false) {
    const { scene } = cube.vm.$options;
    const stickerSize = 1000 / cube.cubeLayers;
    const halfCubeSize = 500;
    const halfStickerSize = stickerSize / 2;
    const spacing = cube.config.stickerSpacing * stickerSize;
    const spacingOffset = spacing * ((cube.model.size - 1) / 2);
    const elevation = halfCubeSize + spacingOffset + (stickerSize * cube.config.stickerElevation);

    // refresh the scene by removing and re-adding all sticker objects
    scene.children
        .filter(child => child.name === 'sticker' || child.name === 'turn')
        .forEach(child => scene.remove(child));

    cube.model.stickers(sticker => scene.add(sticker.display));

    // rotate, position, and translate 
    function rotate(sticker, x, y) {
        if (x) sticker.display.rotation.x = degToRad(x);
        if (y) sticker.display.rotation.y = degToRad(y);
    }

    function position(sticker, x, y, z) {
        if (x) sticker.display.position.x = x;
        if (y) sticker.display.position.y = y;
        if (z) sticker.display.position.z = z;
    }

    function translate(sticker, i) {
        const col = cube.colMap[i];
        const origin = -halfCubeSize + halfStickerSize;
        const row = cube.rowMap[i];

        const x = origin + (col * stickerSize) + (col * spacing) - spacingOffset;
        const y = origin + (row * stickerSize) + (row * spacing) - spacingOffset;

        if (x) sticker.display.translateX(x);
        if (y) sticker.display.translateY(y * -1);
    }

    cube.model.state.U.forEach((sticker, i) => {
        rotate(sticker, -90, 0);
        position(sticker, 0, elevation, 0);
        translate(sticker, i);
    });

    cube.model.state.L.forEach((sticker, i) => {
        rotate(sticker, 0, -90);
        position(sticker, -elevation, 0, 0);
        translate(sticker, i);
    });

    cube.model.state.F.forEach((sticker, i) => {
        position(sticker, 0, 0, elevation);
        translate(sticker, i);
    });

    cube.model.state.R.forEach((sticker, i) => {
        rotate(sticker, 0, 90);
        position(sticker, elevation, 0, 0);
        translate(sticker, i);
    });

    cube.model.state.B.forEach((sticker, i) => {
        rotate(sticker, 0, 180);
        position(sticker, 0, 0, -elevation);
        translate(sticker, i);
    });

    cube.model.state.D.forEach((sticker, i) => {
        rotate(sticker, 90, 0);
        position(sticker, 0, -elevation, 0);
        translate(sticker, i);
    });
}

/**
 * Threejs geometry to represent a sticker.
 * 
 * @param  {Cube}
 * @return {ShapeBufferGeometry}
 */
function stickerGeometry(cube) {
    const stickerSize = 1000 / cube.model.size;
    const shape = new THREE.Shape();
    const offset = -(stickerSize / 2);
    const offsetSize = offset + stickerSize;
    const radius = stickerSize * cube.config.stickerRadius;

    shape.moveTo(offset, offset + radius);
    shape.lineTo(offset, offsetSize - radius);
    shape.quadraticCurveTo(offset, offsetSize, offset + radius, offsetSize);
    shape.lineTo(offsetSize - radius, offsetSize);
    shape.quadraticCurveTo(offsetSize, offsetSize, offsetSize, offsetSize - radius);
    shape.lineTo(offsetSize, offset + radius);
    shape.quadraticCurveTo(offsetSize, offset, offsetSize - radius, offset);
    shape.lineTo(offset + radius, offset);
    shape.quadraticCurveTo(offset, offset, offset, offset + radius);

    return new THREE.ShapeBufferGeometry(shape);
}

/**
 * Update the a turn based on the progress.
 *
 * @param {Cube} cube 
 * @param {Object} parsedTurn 
 * @param {number} progress 
 */
function updateTurn(cube, turnObj, axis, degrees, progress) {
    turnObj.rotation[axis] = degToRad(progress * degrees);
    cube.vm.render();
}

export default class {

    /**
     * Constructor.
     * 
     * @param {Vue} vue
     */
    constructor(vm) {
        this.vm = vm;

        // instantiate a model for our cube
        this.model = new Cube(this.cubeLayers, { useObjects: true });

        // create a 3d object to represent each of our stickers
        attachStickers(this);
    }

    /**
     * Default config.
     * 
     * @return {Object}
     */
    get config() {
        return {
            colors: [
                '#ffeb3b', // U -> yellow
                '#ff9800', // L -> orange
                '#03a9f4', // F -> blue
                '#f44336', // R -> red
                '#4caf50', // B -> green
                '#eeeeee', // D -> white
            ],
            innerBrightness: 0.8,
            stickerElevation: 0.05,
            stickerRadius: 0.1,
            stickerSpacing: 0.1,
            turnDuration: 750,
        };
    }

    /**
     * Map a sticker index to a column index.
     *
     * @return {Array<number>}
     */
    get colMap() {
        return new Array(this.cubeLayers ** 2).fill().map((val, i) => i % this.cubeLayers);
    }

    /**
     * Determine the number of layers in our cube.
     * 
     * @return {number}
     */
    get cubeLayers() {
        // "2x2" -> 2, "3x3" -> 3, etc...
        return parseInt(this.vm.puzzleId, 10);
    }

    /**
     * Map a sticker index to a row index.
     *
     * @return {Array<number>}
     */
    get rowMap() {
        return new Array(this.cubeLayers ** 2).fill().map((val, i) => Math.floor(i / this.cubeLayers));
    }

    /**
     * Determine the size of our canvas.
     * 
     * @return {Object}
     */
    getCanvasDimensions() {
        let maxSize = 480;

        if (this.cubeLayers === 2) maxSize = 280;
        else if (this.cubeLayers === 3) maxSize = 340;

        const size = Math.min(maxSize, this.vm.containerWidth);

        return {
            height: size,
            width: size,
        };
    }

    /**
     * Render
     * 
     * @return {void}
     */
    render() {
        attachStickers(this);
        positionStickers(this);
    }

    /**
     * Turn
     *
     * @param {string} turn
     */
    turn(turn) {
        const fps = 60;
        const parsedTurn = this.model.parseTurn(turn);
        const { turnDuration } = this.config;
        const { axis, degrees } = getTurnAxisAndDegrees(parsedTurn);

        // create a 3d object to represent our turn. we will attach the
        // sticker objects to this and use it to turn all stickers together
        const turnObj = new THREE.Object3D();

        turnObj.name = 'turn';

        // if we're doing a cube rotation, attach all of our stickers to the turn
        if (['X', 'Y', 'Z'].includes(parsedTurn.target)) {
            this.model.stickers(sticker => turnObj.add(sticker.display));
        }

        // otherwise attach only the stickers effected by this turn
        else {
            getStickersEffectedByTurn(this, parsedTurn).forEach(sticker => turnObj.add(sticker.display));
        }

        // attach our turn object to the scene
        this.vm.$options.scene.add(turnObj);
        
        return new Promise(resolve => {
            const { axis, degrees } = getTurnAxisAndDegrees(parsedTurn);

            for (let i = 0; i <= fps; i+= 1) {
                const progress = i / fps;
                const timeout = progress * turnDuration;

                cleanTimeout(this.vm, () => {
                    // animate our effected stickers being turned
                    updateTurn(this, turnObj, axis, degrees, progress);

                    // if the turn is complete. update our model and
                    // re-render in preparation for the next turn.
                    if (progress === 1) {
                        requestAnimationFrame(() => {
                            this.model.turn(turn);
                            this.render();

                            requestAnimationFrame(resolve);
                        });
                    }
                }, timeout);
            }
        });
    }
}