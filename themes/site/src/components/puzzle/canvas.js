/* eslint-disable */
/* eslint-disable no-param-reassign */
import {
    AmbientLight,
    BackSide,
    Mesh,
    MeshLambertMaterial,
    Object3D,
    PerspectiveCamera,
    PointLight,
    Scene,
    Shape,
    ShapeBufferGeometry,
    FrontSide,
    WebGLRenderer,
} from 'three';

import Color from 'color';

/**
 * Create an Object3D for each sticker.
 *
 * @param {Vue} vm
 */
export function attachStickers(vm) {
    // create a shape for our stickers
    const shape = new Shape();
    const offset = -(vm.stickerSize / 2);
    const offsetSize = offset + vm.stickerSize;
    const radius = vm.stickerSize * vm.stickerRadius;

    shape.moveTo(offset, offset + radius);
    shape.lineTo(offset, offsetSize - radius);
    shape.quadraticCurveTo(offset, offsetSize, offset + radius, offsetSize);
    shape.lineTo(offsetSize - radius, offsetSize);
    shape.quadraticCurveTo(offsetSize, offsetSize, offsetSize, offsetSize - radius);
    shape.lineTo(offsetSize, offset + radius);
    shape.quadraticCurveTo(offsetSize, offset, offsetSize - radius, offset);
    shape.lineTo(offset + radius, offset);
    shape.quadraticCurveTo(offset, offset, offset, offset + radius);

    // create a geometry for our rounded rectangle stickers
    const geometry = new ShapeBufferGeometry(shape);

    // attach an Object3D to each sticker
    vm.cube.stickers(sticker => {
        sticker.display = new Object3D();
        sticker.display.name = 'sticker';

        const outerMaterial = new MeshLambertMaterial({
            color: vm.colors[sticker.value],
            side: FrontSide,
        });

        const innerMaterial = new MeshLambertMaterial({
            color: Color(vm.colors[sticker.value]).darken(vm.stickerInnerDarkening).hex(),
            side: BackSide,
        });

        const outerMesh = new Mesh(geometry, outerMaterial);
        const innerMesh = new Mesh(geometry, innerMaterial);

        outerMesh.scale.set(vm.stickerScale, vm.stickerScale, 1);
        innerMesh.scale.set(vm.stickerScale, vm.stickerScale, 1);

        sticker.display.add(outerMesh);
        sticker.display.add(innerMesh);
    });
}

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
 * Initialize the canvas.
 *
 * @param {Vue} vm
 */
export function initCanvas(vm) {
    // renderer
    vm.renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: vm.$refs.canvas,
    });

    vm.renderer.setPixelRatio(window.devicePixelRatio);

    // camera
    vm.camera = new PerspectiveCamera(60, 1, 1, 10000);
    vm.camera.position.set(0, vm.cubeSize * .85, vm.cubeSize * 1.75);
    vm.camera.lookAt(0, 0, 0);

    // scene
    vm.scene = new Scene();

    // lights
    const ambientLight = new AmbientLight(0xffffff, 0.6);
    const pointLight = new PointLight(0xffffff, 0.6);

    vm.scene.add(ambientLight);
    vm.scene.add(pointLight);
    pointLight.position.set(0, vm.cubeSize * 2, vm.cubeSize * 2);
}

/**
 * Position the stickers to their original location.
 *
 * @param {Vue} vm
 */
export function positionStickers(vm) {
    // refresh the scene by removing and re-adding all sticker objects
    vm.scene.children
        .filter(child => child.name === 'sticker')
        .forEach(child => vm.scene.remove(child));

    vm.cube.stickers(sticker => vm.scene.add(sticker.display));
    
    // helper function to place a sticker
    const origin = { x: 0, y: 0, z: 0 };
    const offset = -vm.halfCubeSize + vm.halfStickerSize;

    function rpt(sticker, i, rotation, position) {
        position = { ...origin, ...position };
        rotation = { ...origin, ...rotation };

        // rotate
        sticker.display.rotation.x = degToRad(rotation.x);
        sticker.display.rotation.y = degToRad(rotation.y);
        sticker.display.rotation.z = degToRad(rotation.z);

        // position
        sticker.display.position.x = position.x;
        sticker.display.position.y = position.y;
        sticker.display.position.z = position.z;

        // translate
        const x = offset + (vm.colMap[i] * vm.stickerSize);
        const y = offset - (vm.rowMap[i] * vm.stickerSize) * -1;
        if (x) sticker.display.translateX(x);
        if (y) sticker.display.translateY(y * -1);
    }

    // rotate, position, and translate all stickers
    vm.cube.state.u.forEach((s, i) => rpt(s, i, { x: -90 }, { y: vm.halfCubeSize }));
    vm.cube.state.l.forEach((s, i) => rpt(s, i, { y: -90 }, { x: -vm.halfCubeSize }));
    vm.cube.state.f.forEach((s, i) => rpt(s, i, {}, { z: vm.halfCubeSize }));
    vm.cube.state.r.forEach((s, i) => rpt(s, i, { y: 90 }, { x: vm.halfCubeSize }));
    vm.cube.state.b.forEach((s, i) => rpt(s, i, { y: 180 }, { z: -vm.halfCubeSize }));
    vm.cube.state.d.forEach((s, i) => rpt(s, i, { x: 90 }, { y: -vm.halfCubeSize }));
}

/**
 * Set the renderer dimensions.
 *
 * @param {Vue} vm
 */
export function resizeRenderer(vm) {
    vm.renderer.setSize(vm.width, vm.width);
}
