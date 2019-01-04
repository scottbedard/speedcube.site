import Cube from 'bedard-cube';
import * as THREE from 'three';
import { attachStickers } from './cube/canvas';

export default class {

    /**
     * Constructor.
     * 
     * @param {Vue} vue
     */
    constructor(vm) {
        this.vm = vm;

        this.reset();
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
            stickerElevation: 0.1,
            stickerInnerOpacity: 0.5,
            stickerScale: 0.8,
        };
    }

    /**
     * Determine the number of layers in our cube.
     * 
     * @return {number}
     */
    get size() {
        // "2x2" -> 2, "3x3" -> 3, etc...
        return parseInt(this.vm.puzzleId, 10);
    }

    /**
     * The geometry object for our stickers.
     * 
     * @return {Shape}
     */
    get stickerGeometry() {
        const stickerSize = 5000;
        const stickerRadius = 0.2;

        const shape = new THREE.Shape();
        const offset = -(stickerSize / 2);
        const offsetSize = offset + stickerSize;
        const radius = 0;

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
     * Determine the size of our canvas.
     * 
     * @return {Object}
     */
    getCanvasDimensions() {
        let maxSize = 480;

        if (this.size === 2) maxSize = 280;
        else if (this.size === 3) maxSize = 340;

        const size = Math.min(maxSize, this.vm.containerWidth);

        return {
            height: size,
            width: size,
        };
    }

    /**
     * Position the puzzle's stickers.
     * 
     * @return {void}
     */
    positionStickers() {
        console.log('positioning');
        
        const sticker = this.model.state.U[0];

        sticker.display.position.x = 200;
        sticker.display.position.y = 200;
        sticker.display.position.z = 0;

        this.vm.$options.scene.add(sticker.display);

        console.log(sticker);

        // // refresh the scene by removing and re-adding all sticker objects
        // vm.scene.children
        //     .filter(child => child.name === 'sticker' || child.name === 'turn')
        //     .forEach(child => vm.scene.remove(child));

        // vm.cube.stickers(sticker => vm.scene.add(sticker.display));

        // // helper function to place a sticker
        // const origin = { x: 0, y: 0, z: 0 };
        // const offset = -vm.halfPuzzleWidth + vm.halfStickerWidth;

        // // rotate, position, translate
        // function rpt(sticker, i, rotation, position) {
        //     position = { ...origin, ...position };
        //     rotation = { ...origin, ...rotation };

        //     // rotate
        //     sticker.display.rotation.x = degToRad(rotation.x);
        //     sticker.display.rotation.y = degToRad(rotation.y);
        //     sticker.display.rotation.z = degToRad(rotation.z);

        //     // position
        //     sticker.display.position.x = position.x;
        //     sticker.display.position.y = position.y;
        //     sticker.display.position.z = position.z;

        //     // translate
        //     const x = offset + (vm.colMap[i] * vm.stickerWidth);
        //     const y = offset - (vm.rowMap[i] * vm.stickerWidth) * -1;
        //     if (x) sticker.display.translateX(x);
        //     if (y) sticker.display.translateY(y * -1);
        // }

        // // rotate, position, and translate all stickers
        // const elevation = vm.stickerWidth * vm.normalizedConfig.stickerElevation;

        // vm.cube.state.U.forEach((s, i) => rpt(s, i, { x: -90 }, { y: vm.halfPuzzleWidth + elevation }));
        // vm.cube.state.L.forEach((s, i) => rpt(s, i, { y: -90 }, { x: -vm.halfPuzzleWidth - elevation }));
        // vm.cube.state.F.forEach((s, i) => rpt(s, i, {}, { z: vm.halfPuzzleWidth + elevation }));
        // vm.cube.state.R.forEach((s, i) => rpt(s, i, { y: 90 }, { x: vm.halfPuzzleWidth + elevation }));
        // vm.cube.state.B.forEach((s, i) => rpt(s, i, { y: 180 }, { z: -vm.halfPuzzleWidth - elevation }));
        // vm.cube.state.D.forEach((s, i) => rpt(s, i, { x: 90 }, { y: -vm.halfPuzzleWidth - elevation }));
    }

    /**
     * Reset the scene.
     * 
     * @return {void}
     */
    reset() {
        // create a state model for our cube
        this.model = new Cube(this.size, { useObjects: true });

        // create a 3d object to represent each sticker
        const geometry = this.stickerGeometry;

        this.model.stickers(sticker => {
            sticker.display = new THREE.Object3D();
            sticker.display.name = 'sticker';

            const outerMaterial = new THREE.MeshLambertMaterial({
                color: 0xff0000,
                side: THREE.DoubleSide,
            });

            const outerMesh = new THREE.Mesh(geometry, outerMaterial);

            sticker.display.add(outerMesh);
        });
        // sticker.display = new Object3D();
        // sticker.display.name = 'sticker';

        // const color = vm.normalizedConfig.colors[sticker.value]; // vm.masked ? vm.maskColor : vm.colors[sticker.value];

        // const outerMaterial = new MeshLambertMaterial({ 
        //     color: color,
        //     side: FrontSide,
        // });

        // const innerMaterial = new MeshLambertMaterial({
        //     color: color,
        //     side: BackSide,
        //     transparent: true,
        //     opacity: vm.normalizedConfig.stickerInnerOpacity,
        // });

        // const outerMesh = new Mesh(geometry, outerMaterial);
        // const innerMesh = new Mesh(geometry, innerMaterial);

        // outerMesh.scale.set(vm.stickerScale, vm.normalizedConfig.stickerScale, 1);
        // innerMesh.scale.set(vm.stickerScale, vm.normalizedConfig.stickerScale, 1);

        // sticker.display.add(outerMesh);
        // sticker.display.add(innerMesh);
    }
}