import Cube from 'bedard-cube';
import * as THREE from 'three';

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
            opacity: 0.5,
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
 * Position the stickers.
 * 
 * @param  {Cube} cube
 * @return {void}
 */
function positionStickers(cube) {
    const { scene } = cube.vm.$options;
    const stickerSize = 1000 / cube.cubeLayers;
    const halfCubeSize = 500;
    const halfStickerSize = stickerSize / 2;
    const spacing = cube.config.stickerSpacing * stickerSize;
    const spacingOffset = spacing * ((cube.model.size - 1) / 2);
    const elevation = halfCubeSize + spacingOffset + (stickerSize * cube.config.stickerElevation);

    console.log('elevation', elevation)

    // refresh the scene by removing and re-adding all sticker objects
    scene.children
        .filter(child => child.name === 'sticker' || child.name === 'turn')
        .forEach(scene.remove);

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
            stickerElevation: 0.05,
            stickerRadius: 0.1,
            stickerSpacing: 0.1,
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
     * Render the puzzle.
     * 
     * @return {void}
     */
    render() {
        positionStickers(this);
    }
}