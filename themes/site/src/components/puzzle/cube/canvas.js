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

        const color = vm.normalizedConfig.colors[sticker.value]; // vm.masked ? vm.maskColor : vm.colors[sticker.value];

        const outerMaterial = new MeshLambertMaterial({ 
            color: color,
            side: FrontSide,
        });

        const innerMaterial = new MeshLambertMaterial({
            color: color,
            side: BackSide,
            transparent: true,
            opacity: vm.normalizedConfig.stickerInnerOpacity,
        });

        const outerMesh = new Mesh(geometry, outerMaterial);
        const innerMesh = new Mesh(geometry, innerMaterial);

        outerMesh.scale.set(vm.stickerScale, vm.normalizedConfig.stickerScale, 1);
        innerMesh.scale.set(vm.stickerScale, vm.normalizedConfig.stickerScale, 1);

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
    const { depth, target, wide } = parsedTurn;
    const zeroDepth = depth - 1;
    const reverseDepth = size - depth;

    // attach the entire face of wide turns
    if (wide || depth === 1) {
        stickers.push(...cube.state[parsedTurn.target]);
    }

    // attach the entire opposite face of inner turns
    if (depth >= size) {
        const opposite = {
            U: 'D',
            L: 'R',
            F: 'B',
            R: 'L',
            B: 'F',
            D: 'U',
        };

        stickers.push(...cube.state[opposite[target]]);
    }

    // get the slices being turned
    if (target === 'U') {
        stickers.push(
            ...cube.state.B.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.R.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.F.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.L.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
        );
    } else if (target === 'L') {
        stickers.push(
            ...cube.state.U.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.F.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.D.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.B.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (target === 'F') {
        stickers.push(
            ...cube.state.U.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.R.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.D.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.L.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (target === 'R') {
        stickers.push(
            ...cube.state.U.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
            ...cube.state.B.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.D.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
            ...cube.state.F.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (target === 'B') {
        stickers.push(
            ...cube.state.U.filter((s, i) => wide ? rowMap[i] < depth : rowMap[i] === zeroDepth),
            ...cube.state.L.filter((s, i) => wide ? colMap[i] < depth : colMap[i] === zeroDepth),
            ...cube.state.D.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.R.filter((s, i) => wide ? colMap[i] >= reverseDepth : colMap[i] === reverseDepth),
        );
    } else if (target === 'D') {
        stickers.push(
            ...cube.state.B.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.R.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.F.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
            ...cube.state.L.filter((s, i) => wide ? rowMap[i] >= reverseDepth : rowMap[i] === reverseDepth),
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
 * Create an object to turn, and attach all relevant stickers to it.
 *
 * @param {Vue} vm
 * @param {Object} parsedTurn
 */
export function getTurnObject(vm, parsedTurn) {
    const obj = new Object3D();

    obj.name = 'turn';

    if (['X', 'Y', 'Z'].includes(parsedTurn.target)) {
        // if the entire cube is being turned, add all stickers to the turn object
        vm.cube.stickers((s) => obj.add(s.display));
    } else {
        // otherwise add only the stickers being effected by the turn
        const effected = getEffectedStickers(vm, parsedTurn);

        effected.forEach((s) => obj.add(s.display));
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
    const offset = -vm.halfPuzzleWidth + vm.halfStickerWidth;

    // rotate, position, translate
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
        const x = offset + (vm.colMap[i] * vm.stickerWidth);
        const y = offset - (vm.rowMap[i] * vm.stickerWidth) * -1;
        if (x) sticker.display.translateX(x);
        if (y) sticker.display.translateY(y * -1);
    }

    // rotate, position, and translate all stickers
    const elevation = vm.stickerWidth * vm.normalizedConfig.stickerElevation;

    vm.cube.state.U.forEach((s, i) => rpt(s, i, { x: -90 }, { y: vm.halfPuzzleWidth + elevation }));
    vm.cube.state.L.forEach((s, i) => rpt(s, i, { y: -90 }, { x: -vm.halfPuzzleWidth - elevation }));
    vm.cube.state.F.forEach((s, i) => rpt(s, i, {}, { z: vm.halfPuzzleWidth + elevation }));
    vm.cube.state.R.forEach((s, i) => rpt(s, i, { y: 90 }, { x: vm.halfPuzzleWidth + elevation }));
    vm.cube.state.B.forEach((s, i) => rpt(s, i, { y: 180 }, { z: -vm.halfPuzzleWidth - elevation }));
    vm.cube.state.D.forEach((s, i) => rpt(s, i, { x: 90 }, { y: -vm.halfPuzzleWidth - elevation }));
}

/**
 * Set the renderer dimensions.
 *
 * @param {Vue} vm
 */
export function resizeRenderer(vm) {
    vm.renderer.setSize(vm.width, vm.width);
}
