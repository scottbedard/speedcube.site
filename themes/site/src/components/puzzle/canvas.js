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

        const color = vm.masked ? vm.maskColor : vm.colors[sticker.value];

        const outerMaterial = new MeshLambertMaterial({
            color: color,
            side: FrontSide,
        });

        const innerMaterial = new MeshLambertMaterial({
            color: color,
            side: BackSide,
            transparent: true,
            opacity: vm.stickerInnerOpacity,
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
 * Get the stickers being effected by a turn.
 *
 * @param {Vue} vm
 * @param {Object} parsedTurn
 */
export function getEffectedStickers(vm, parsedTurn) {
    const stickers = [];
    const { cube, colMap, rowMap } = vm;
    const { size } = vm.cube;
    const { depth, face, outer } = parsedTurn;
    const zeroDepth = depth - 1;
    const reverseDepth = size - depth;

    // attach the entire face of outer turns
    if (parsedTurn.outer) {
        stickers.push(...cube.state[parsedTurn.face]);
    }

    // attach the entire opposite face of inner turns
    if (depth >= size) {
        const opposite = { u: 'd', l: 'r', f: 'b', r: 'l', b: 'f', d: 'u' };
        stickers.push(...cube.state[opposite[parsedTurn.face]]);
    }

    // get the slices being turned
    if (face === 'u') {
        stickers.push(
            ...cube.state.b.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.r.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.f.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.l.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
        );
    } else if (face === 'l') {
        stickers.push(
            ...cube.state.u.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.f.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.d.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.b.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (face === 'f') {
        stickers.push(
            ...cube.state.u.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.r.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.d.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.l.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (face === 'r') {
        stickers.push(
            ...cube.state.u.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
            ...cube.state.b.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.d.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
            ...cube.state.f.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (face === 'b') {
        stickers.push(
            ...cube.state.u.filter((s, i) => outer ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.l.filter((s, i) => outer ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.d.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.r.filter((s, i) => outer ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (face === 'd') {
        stickers.push(
            ...cube.state.b.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.r.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.f.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.l.filter((s, i) => outer ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
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
    let axis, degrees;
    const { double, face, prime, whole } = parsedTurn;

    // helper function to get turn degrees. note that the
    // clockwise / counter-clickwise degrees might seem
    // backwards. this is because we're turning from the
    // context of our scene's world axis, not the face.
    const deg = (cw, ccw) => double ? 180 : (prime ? ccw : cw);

    if (whole) {
        axis = face;
        degrees = deg(-90, 90);
    } else {
        if (face === 'u') {
            axis = 'y';
            degrees = deg(-90, 90);
        } else if (face === 'l') {
            axis = 'x';
            degrees = deg(90, -90);
        } else if (face === 'f') {
            axis = 'z';
            degrees = deg(-90, 90);
        } else if (face === 'r') {
            axis = 'x';
            degrees = deg(-90, 90);
        } else if (face === 'b') {
            axis = 'z';
            degrees = deg(90, -90);
        } else if (face === 'd') {
            axis = 'y';
            degrees = deg(90, -90);
        }  
    }

    return { axis, degrees };
}

/**
 * Create an object to turn, and attach all relevant stickers to it.
 *
 * @param {Vue} vm
 * @param {Object} parsedTurn
 */
export function getTurnObject(vm, parsedTurn) {
    const obj = new Object3D();

    obj.name = 'turn';

    if (parsedTurn.whole) {
        // if the entire cube is being turned, add all stickers to the turn object
        vm.cube.stickers((s) => obj.add(s.display));
    } else {
        // otherwise add only the stickers being effected by the turn
        getEffectedStickers(vm, parsedTurn).forEach((s) => obj.add(s.display));
    }

    vm.scene.add(obj);

    return obj;
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
    vm.camera.position.set(0, vm.cubeSize * 1.2, vm.cubeSize * 1.75);
    vm.camera.lookAt(0, 0, 0);

    // scene
    vm.scene = new Scene();

    // lights
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    const pointLight = new PointLight(0xffffff, 0.7);

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
        .filter(child => child.name === 'sticker' || child.name === 'turn')
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
    const elevation = vm.stickerSize * vm.stickerElevation;
    vm.cube.state.u.forEach((s, i) => rpt(s, i, { x: -90 }, { y: vm.halfCubeSize + elevation }));
    vm.cube.state.l.forEach((s, i) => rpt(s, i, { y: -90 }, { x: -vm.halfCubeSize - elevation }));
    vm.cube.state.f.forEach((s, i) => rpt(s, i, {}, { z: vm.halfCubeSize + elevation }));
    vm.cube.state.r.forEach((s, i) => rpt(s, i, { y: 90 }, { x: vm.halfCubeSize + elevation }));
    vm.cube.state.b.forEach((s, i) => rpt(s, i, { y: 180 }, { z: -vm.halfCubeSize - elevation }));
    vm.cube.state.d.forEach((s, i) => rpt(s, i, { x: 90 }, { y: -vm.halfCubeSize - elevation }));
}

/**
 * Set the renderer dimensions.
 *
 * @param {Vue} vm
 */
export function resizeRenderer(vm) {
    vm.renderer.setSize(vm.width, vm.width);
}
