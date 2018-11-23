/* eslint-disable */
/* eslint-disable no-param-reassign */

import {
    AmbientLight,
    DoubleSide,
    AxesHelper,
    Mesh,
    Color,
    MeshBasicMaterial,
    SpotLightHelper,
    MeshLambertMaterial,
    SpotLight,
    Object3D,
    PerspectiveCamera,
    PointLight,
    Scene,
    Shape,
    ShapeBufferGeometry,
    WebGLRenderer,
} from 'three';

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

    // geometry.computeFaceNormals();
    // geometry.computeVertexNormals();

    // attach an Object3D to each sticker
    vm.cube.stickers(sticker => {
        sticker.display = new Object3D();

        const material = new MeshLambertMaterial({
            color: 0x00afaf,
            // emissive: 0xff0000,
            // emissiveIntensity: .9,
            side: DoubleSide
        });

        const mesh = new Mesh(geometry, material);

        sticker.display.add(mesh);
    });
}

/**
 * Initialize the canvas.
 *
 * @param {Vue} vm
 */
export function initCanvas(vm) {
    // const renderer = new THREE.WebGLRenderer({ canvas: vm.$refs.canvas, antialias: true });
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 300, 10000);
    // renderer.setSize(window.innerWidth, window.innerHeight);

    // renderer
    vm.renderer = new WebGLRenderer({
        canvas: vm.$refs.canvas,
        antialias: true,
    });

    vm.renderer.setClearColor(0x000000);
    vm.renderer.setPixelRatio(window.devicePixelRatio);

    // camera
    vm.camera = new PerspectiveCamera(25, 1, 300, 10000);

    // scene
    vm.scene = new Scene();

    // lights
    vm.scene.add(new AmbientLight(0xffffff, 0.5));
    vm.scene.add(new PointLight(0xffffff, 0.5));

    // add an axis helper
    vm.scene.add(new AxesHelper(600));
}

/**
 * Position the stickers to their original location.
 *
 * @param {Vue} vm
 */
export function positionStickers(vm) {
    // remove everything from the scene and re-add the stickers
    while(vm.scene.children.length > 0) {
        vm.scene.remove(vm.scene.children[0]);
    }

    // add all stickers to the scene
    // vm.cube.stickers(sticker => vm.scene.add(sticker.mesh));
    const testSticker = vm.cube.state.u[0].display;

    console.log(testSticker);

    vm.scene.add(testSticker);

    testSticker.position.x = 0;
    testSticker.position.y = 0;
    testSticker.position.z = 0;
}

/**
 * Set the renderer dimensions.
 *
 * @param {Vue} vm
 */
export function resizeRenderer(vm) {
    vm.renderer.setSize(vm.width, vm.width);
}